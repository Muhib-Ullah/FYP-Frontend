import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {

  constructor(private Toast: ToastrService) { }

  //Properties
  selectedImageUrl: string | null = null;

  //Methods
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    console.log('File selected:', file);
    this.selectedImageUrl = URL.createObjectURL(file);
  }

  resetSelection() {
    this.selectedImageUrl = null;
  }

  handleSuccess(){
    console.log('i am running')
    if(this.selectedImageUrl){
      this.Toast.success('API KAHAN HAI BHAI!')
    }
    else{
      this.Toast.error('Please select an image first.')
    }
  }

  extractedText: string = 'sdsfadfsdfdsffs'; // The extracted text from the image

  copyText() {
    navigator.clipboard.writeText(this.extractedText)
      .then(() => {
        this.Toast.success('Text copied to clipboard');
      })
      .catch((error) => {
        this.Toast.error('Error copying text to clipboard');
        console.error('Error copying text:', error);
      });
  
  }

  //Services Calls
}
