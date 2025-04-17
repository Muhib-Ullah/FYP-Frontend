import { Component } from '@angular/core';
import { SummarizationService } from '../../services/summarization.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-summarization',
  templateUrl: './summarization.component.html',
  styleUrl: './summarization.component.css'
})
export class SummarizationComponent {
  selectedDifficulty: string = "Easy";
  InputText: string = '';
  OutputText: string = '';
  RequestInProgress: boolean = false;
  SampleUrduText = [
    "تعلیم انسان کی شخصیت سنوارنے میں اہم کردار ادا کرتی ہے۔ یہ نہ صرف علم حاصل کرنے کا ذریعہ ہے بلکہ سوچنے، سمجھنے اور صحیح فیصلے کرنے کی صلاحیت بھی فراہم کرتی ہے۔ ایک تعلیم یافتہ قوم ہی ترقی کی منازل طے کر سکتی ہے۔ اس لیے ہر فرد کو تعلیم حاصل کرنا چاہیے تاکہ وہ اپنے ملک کی ترقی میں مثبت کردار ادا کر سکے۔",
  
    "قدرتی مناظر انسان کو سکون اور تازگی کا احساس دلاتے ہیں۔ سبز و شاداب درخت، بہتے ہوئے چشمے، نیلا آسمان اور پرندوں کی چہچہاہٹ ایک خوبصورت ماحول پیدا کرتے ہیں۔ دیہی علاقوں میں قدرتی مناظر کا حسن دل کو بھا جاتا ہے۔ ایسے مناظر ہمیں قدرت کے قریب لے جاتے ہیں اور اس کی عظمت کا احساس دلاتے ہیں۔",
  
    "ماں کی محبت دنیا کی سب سے خالص اور بے لوث محبت ہوتی ہے۔ وہ اپنے بچوں کے لیے ہر قربانی دینے کو تیار ہوتی ہے۔ ماں کا سایہ انسان کے لیے سب سے بڑی نعمت ہے۔ اس کی دعائیں ہر مشکل کو آسان کر دیتی ہیں۔ ماں کی گود میں انسان کو جنت کا سا سکون ملتا ہے۔",
  
    "نماز اسلام کا ایک اہم رکن ہے جو مسلمان پر فرض کی گئی ہے۔ یہ انسان کو برائیوں سے بچاتی ہے اور دل کو سکون فراہم کرتی ہے۔ نماز کے ذریعے انسان اللہ سے رابطہ قائم کرتا ہے اور اس کے حضور جھکتا ہے۔ دن میں پانچ وقت نماز ادا کرنے سے نہ صرف روحانی سکون حاصل ہوتا ہے بلکہ نظم و ضبط کی عادت بھی پیدا ہوتی ہے۔"
  ];
  constructor(private SummarizationService: SummarizationService, private Toast: ToastrService) { }

  selectDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
  }

  clearText() {
    this.InputText = ''
  }

  clearOutputText() {
    this.OutputText = ''
  }

  

  copyText(event: Event) {
    const buttonElement = (event.currentTarget as HTMLElement);
    const buttonId = buttonElement.id;

    let textToCopy = '';
    if (this.InputText || this.OutputText) {
      textToCopy = buttonId === 'inputbtn' ? this.InputText : this.OutputText;
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
      const formData = {
        text: this.InputText,
        difficulty: this.selectedDifficulty
      };
      this.RequestInProgress = true;
      this.SummarizationService.summarizeText(formData).subscribe(
        (response) => {
          if (response.status) {
            this.OutputText = response.data;
            this.RequestInProgress = false;
          } else {
            this.Toast.error(response.message);
            this.RequestInProgress = false;
            this.clearOutputText();
          }
        },
        (err) => {
          this.Toast.error(err.error.message);
          this.RequestInProgress = false;
          this.clearOutputText();
        }
      );
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      this.RequestInProgress = false;
    }
  }

  getRandomUrduParagraph() {
    const randomIndex = Math.floor(Math.random() * this.SampleUrduText.length);
    this.InputText = this.SampleUrduText[randomIndex];
  }

}









