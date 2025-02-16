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
  
  constructor(private ocrService: OCRService, private ttsService: TtsService, private Toast: ToastrService) { }

  clearText() {
    this.InputText = ''
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
