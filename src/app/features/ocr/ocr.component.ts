import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OCRService } from '../../services/ocr.service';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {

  constructor(private Toast: ToastrService, private ocrService: OCRService) { }

  //Properties
  selectedImageUrl: string | null = null;
  selectedFiles = new FormData();
  extractedText: string = '';

  //Methods
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const file:any = event.dataTransfer.files;
      this.selectedImageUrl = URL.createObjectURL(file[0]);
      Array.from(file.files).forEach((file:any) => {
        this.selectedFiles.append('images', file, file.name);
      });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      this.selectedImageUrl = URL.createObjectURL(file);
      Array.from(input.files).forEach((file:any) => {
        this.selectedFiles.append('images', file, file.name);
      });
    }
  }

  // handleFile(file: any) {
  //   console.log('File selected:', file);
  //   Array.from(file.files).forEach((file:any) => {
  //     this.selectedFiles.append('images', file, file.name);
  //   });
  // }

  resetSelection() {
    this.selectedImageUrl = null;
    this.selectedFiles = new FormData();
  }


  extractText(){
   this.ocrService.textExtraction(this.selectedFiles).subscribe({
    next: (response) => {
      if (response[0].status) {
        this.extractedText = response[0].data 
        console.log('response :>> ', response);
      } else {
        this.Toast.error(response[0].data);
        console.log('response :>> ', response);
      }
      this.selectedFiles = new FormData()
    },
    error: (err) => {
      this.Toast.error(err.error.message);
    },
  });

  }

  // extractText(){
  //   console.log('i am running')
  //   if(this.selectedImageUrl){
  //     this.Toast.success('API KAHAN HAI BHAI!')
  //   }
  //   else{
  //     this.Toast.error('Please select an image first.')
  //   }
  // }


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
