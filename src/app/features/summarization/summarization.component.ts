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

  constructor(private SummarizationService: SummarizationService, private Toast: ToastrService ) { }

  selectDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
  }

  clearText() {
    this.InputText = ''
  }

  clearOutputText() {
    this.OutputText =  ''
  }

  copyText() {
    navigator.clipboard.writeText(this.OutputText)
      .then(() => {
        this.Toast.success('Text copied to clipboard');
      })
      .catch((error) => {
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
          }else {
            this.Toast.error(response.message);
            this.RequestInProgress = false; 
            this.clearOutputText();
          }
        },
        (err) => {
          console.log('err :>> ', err);
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
  
}









