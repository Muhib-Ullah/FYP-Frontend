import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TtsService } from '../../services/tts.service';

@Component({
  selector: 'app-texttospeech',
  templateUrl: './texttospeech.component.html',
  styleUrl: './texttospeech.component.css'
})
export class TexttospeechComponent {
  InputText: string = '';
  OutputAudio: string | null = null;
  RequestInProgress: boolean = false;

  constructor(private ttsService: TtsService, private Toast: ToastrService) { }

  clearText() {
    this.InputText = ''
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
