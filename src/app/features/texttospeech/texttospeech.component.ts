import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TtsService } from '../../services/tts.service';
import { OCRService } from '../../services/ocr.service';

@Component({
  selector: 'app-texttospeech',
  templateUrl: './texttospeech.component.html',
  styleUrl: './texttospeech.component.css'
})
export class TexttospeechComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  InputText: string = '';
  OutputAudio: string | null = null;
  RequestInProgress: boolean = false;
  selectedPdfFile: File | null = null;
  PdfFileData: FormData = new FormData();
  isPlaying = false;
  SampleUrduText = [
    "تعلیم انسان کی شخصیت سنوارنے میں اہم کردار ادا کرتی ہے۔ یہ نہ صرف علم حاصل کرنے کا ذریعہ ہے بلکہ سوچنے، سمجھنے اور صحیح فیصلے کرنے کی صلاحیت بھی فراہم کرتی ہے۔ ایک تعلیم یافتہ قوم ہی ترقی کی منازل طے کر سکتی ہے۔ اس لیے ہر فرد کو تعلیم حاصل کرنا چاہیے تاکہ وہ اپنے ملک کی ترقی میں مثبت کردار ادا کر سکے۔",
  
    "قدرتی مناظر انسان کو سکون اور تازگی کا احساس دلاتے ہیں۔ سبز و شاداب درخت، بہتے ہوئے چشمے، نیلا آسمان اور پرندوں کی چہچہاہٹ ایک خوبصورت ماحول پیدا کرتے ہیں۔ دیہی علاقوں میں قدرتی مناظر کا حسن دل کو بھا جاتا ہے۔ ایسے مناظر ہمیں قدرت کے قریب لے جاتے ہیں اور اس کی عظمت کا احساس دلاتے ہیں۔",
  
    "ماں کی محبت دنیا کی سب سے خالص اور بے لوث محبت ہوتی ہے۔ وہ اپنے بچوں کے لیے ہر قربانی دینے کو تیار ہوتی ہے۔ ماں کا سایہ انسان کے لیے سب سے بڑی نعمت ہے۔ اس کی دعائیں ہر مشکل کو آسان کر دیتی ہیں۔ ماں کی گود میں انسان کو جنت کا سا سکون ملتا ہے۔",
  
    "نماز اسلام کا ایک اہم رکن ہے جو مسلمان پر فرض کی گئی ہے۔ یہ انسان کو برائیوں سے بچاتی ہے اور دل کو سکون فراہم کرتی ہے۔ نماز کے ذریعے انسان اللہ سے رابطہ قائم کرتا ہے اور اس کے حضور جھکتا ہے۔ دن میں پانچ وقت نماز ادا کرنے سے نہ صرف روحانی سکون حاصل ہوتا ہے بلکہ نظم و ضبط کی عادت بھی پیدا ہوتی ہے۔"
  ];
  
  constructor(private ocrService: OCRService, private ttsService: TtsService, private Toast: ToastrService) { }

  clearText() {
    this.InputText = ''
  }

  getRandomUrduParagraph() {
    const randomIndex = Math.floor(Math.random() * this.SampleUrduText.length);
    this.InputText = this.SampleUrduText[randomIndex];
  }
  
  toggleAudio() {
    if (this.audioPlayer) {
      const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
      if(!this.OutputAudio){
        this.Toast.error("Convert text to speech first.")
      }
      else{
        if (this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        this.isPlaying = !this.isPlaying;
      }
    }
  }

  copyText() {
    let textToCopy = '';
    if (this.InputText) {
      textToCopy = this.InputText;
    }  
    else {
      this.Toast.error('Please provide valid text to copy.');
      return;
    }
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        this.Toast.success('Text copied to clipboard');
      })
      .catch(() => {
        this.Toast.error('Error copying text to clipboard');
      });
  }

  onFileSelected(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.selectedPdfFile = event.target.files[0];
      if(!this.selectedPdfFile){
        this.Toast.error('No PDF file selected.')
      }
      else{
        this.PdfFileData.append('file', this.selectedPdfFile, this.selectedPdfFile.name)
        this.ocrService.scanOCRPdf(this.PdfFileData).subscribe((response) => {
          if(response.status){
            const pdfExtractedText = response.data.join(' ');
            this.InputText = pdfExtractedText;
          }
          else{
            this.Toast.error('Cannot extract text from Pdf. Please try again later.')
          }
        })
      }
    }
  }

  onSubmit() {
    try {
      if (this.RequestInProgress) {
        this.Toast.error('Please wait. Request in progress');
        return;
      }
      if (!this.InputText || this.InputText.trim().length === 0) {
        this.Toast.error('Please provide some text.');
        return;
      }
      const formData = {text: this.InputText};
      this.RequestInProgress = true;
      this.ttsService.convertToSpeech(formData).subscribe({
        next: (response) => {
          if (response.status) {
            this.RequestInProgress = false;
            const audioBlob = this.ttsService.base64ToBlob(response.audio_base64, 'audio/mp3');
            this.OutputAudio = URL.createObjectURL(audioBlob);
            this.Toast.success("Text converted to speech succesfully.")
          } else {
            this.Toast.error('An error occured while generating audio.');
            this.RequestInProgress = false;
          }
        },
        error: (err) => {
          this.Toast.error(err.error.message);
          this.RequestInProgress = false;
        },
      });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      this.RequestInProgress = false;
    }
  }
}
