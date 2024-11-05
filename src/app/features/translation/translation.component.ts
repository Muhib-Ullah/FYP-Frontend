import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})
export class TranslationComponent {
  InputText: string = '';
  OutputText: string = '';
  RequestInProgress: boolean = false;

  constructor(private translationService: TranslationService, private Toast: ToastrService) { }

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
      };

      this.RequestInProgress = true;
      this.translationService.translateText(formData).subscribe({
        next: (response) => {
          if (response.status) {
            this.OutputText = response.data;
            this.RequestInProgress = false;
          } else {
            this.Toast.error(response.message);
            this.RequestInProgress = false;
            this.clearOutputText();
          }
        },
        error: (err) => {
          this.Toast.error(err.error.message);
          this.RequestInProgress = false;
          this.clearOutputText();
        },
      });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      this.RequestInProgress = false;
    }
  }
}
