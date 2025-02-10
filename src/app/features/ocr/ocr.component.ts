import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OCRService } from '../../services/ocr.service';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {
  selectedImageURLs: string[] = [];
  selectedImageData: FormData = new FormData();
  selectedPdfURL: string[] = [];
  selectedPdfData: FormData = new FormData();
  imageIndexTracker: number = 0;
  multipleFileSelection: boolean = true;
  selectedFileType: string = 'image/*'
  ImageResponseData: any[] = [];
  PdfResponseData: any[] = [];
  showImageText: string = '';
  pdfIndexTracker: number = 0;
  pdfTotalPages: number = 0;

  constructor(private Toast: ToastrService, private OcrService: OCRService) {
  }

  onFileDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.onFileSelected(event);
  }

  onFileSelected(event: Event) {
    let selectedFiles: FileList | null = null;
    if (event.target instanceof HTMLInputElement) {
      selectedFiles = event.target.files
    }
    else if (event instanceof DragEvent) {
      selectedFiles = event.dataTransfer?.files || null
    }
    if (selectedFiles != null && selectedFiles.length > 0) {
      this.selectedImageURLs = [];
      this.selectedPdfURL = [];
      Array.from(selectedFiles).forEach((file: File) => {
        const fileUrl = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
          this.selectedImageURLs.push(fileUrl);
          this.selectedImageData.append('images', file, file.name)
          console.log(this.selectedImageURLs)
        }
        else if(file.type === 'application/pdf') {
          this.selectedPdfURL.push(fileUrl)
          this.selectedPdfData.append('file', file, file.name)
        }
        else {
          this.Toast.error('Please Select a file of valid format.')
        }
      });
      this.imageIndexTracker = 0;
    }
  }

  navigateImages(action: string) {
    if (action === 'prev' && this.imageIndexTracker > 0) {
      this.imageIndexTracker--;
    }
    else if (action === 'next' && this.imageIndexTracker < this.selectedImageURLs.length - 1) {
      this.imageIndexTracker++;
    }

    if(this.ImageResponseData.length > 0) {
      this.showImageText = this.ImageResponseData[this.imageIndexTracker].data;
    }
  }

  navigatePdfPages(action: string) {
    if (action === 'prev' && this.pdfIndexTracker > 0) {
      this.pdfIndexTracker--;
    }
    else if (action === 'next' && this.pdfIndexTracker < this.pdfTotalPages - 1) {
      this.pdfIndexTracker++;
    }

    if(this.pdfTotalPages > 0) {
      this.showImageText = this.PdfResponseData[this.pdfIndexTracker];
      console.log(this.showImageText)
    }
  }

  getSelectedImage(): string {
    return this.selectedImageURLs[this.imageIndexTracker];
  }

  selectFileType(type: string) {
    if (type == '.pdf') {
      this.selectedFileType = '.pdf';
      this.multipleFileSelection = false;
    }
    else if (type == 'image/*') {
      this.selectedFileType = 'image/*';
      this.multipleFileSelection = false;
    }
  }

  onSubmit() {
    if(this.selectedFileType == 'image/*'){
      this.OcrService.scanOCRImage(this.selectedImageData).subscribe((response)=> {
        if(response[0].status) {
          this.ImageResponseData = response;
          this.showImageText = this.ImageResponseData[this.imageIndexTracker].data;
        }
        else{
          console.log(response)
        }
      })
    }
    else if(this.selectedFileType=='.pdf') {
      this.OcrService.scanOCRPdf(this.selectedPdfData).subscribe((response)=> {
        if(response.status) {
          this.PdfResponseData = response.data;
          this.showImageText = response.data[0];
          this.pdfTotalPages = response.data.length;
          console.log(response)
        }
        else{
          console.log(response)
        }
      })
    }
  }







  // constructor(private Toast: ToastrService, private ocrService: OCRService) { }

  // //Properties
  // selectedImageUrl: string | null = null;
  // selectedFiles = new FormData();
  // extractedText: string = '';

  // //Methods
  // onFileDrop(event: DragEvent) {
  //   event.preventDefault();
  //   if (event.dataTransfer?.files) {
  //     const file:any = event.dataTransfer.files;
  //     this.selectedImageUrl = URL.createObjectURL(file[0]);
  //     Array.from(file.files).forEach((file:any) => {
  //       this.selectedFiles.append('images', file, file.name);
  //     });
  //   }
  // }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  // }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     const file = input.files[0];
  //     this.selectedImageUrl = URL.createObjectURL(file);
  //     Array.from(input.files).forEach((file:any) => {
  //       this.selectedFiles.append('images', file, file.name);
  //     });
  //   }
  // }

  // handleFile(file: any) {
  //   console.log('File selected:', file);
  //   Array.from(file.files).forEach((file:any) => {
  //     this.selectedFiles.append('images', file, file.name);
  //   });
  // }

  // resetSelection() {
  //   this.selectedImageUrl = null;
  //   this.selectedFiles = new FormData();
  // }


  // extractText(){
  //  this.ocrService.textExtraction(this.selectedFiles).subscribe({
  //   next: (response) => {
  //     if (response[0].status) {
  //       this.extractedText = response[0].data 
  //       console.log('response :>> ', response);
  //     } else {
  //       this.Toast.error(response[0].data);
  //       console.log('response :>> ', response);
  //     }
  //     this.selectedFiles = new FormData()
  //   },
  //   error: (err) => {
  //     this.Toast.error(err.error.message);
  //   },
  // });

  // }

  // extractText(){
  //   console.log('i am running')
  //   if(this.selectedImageUrl){
  //     this.Toast.success('API KAHAN HAI BHAI!')
  //   }
  //   else{
  //     this.Toast.error('Please select an image first.')
  //   }
  // }


  // copyText() {
  //   navigator.clipboard.writeText(this.extractedText)
  //     .then(() => {
  //       this.Toast.success('Text copied to clipboard');
  //     })
  //     .catch((error) => {
  //       this.Toast.error('Error copying text to clipboard');
  //       console.error('Error copying text:', error);
  //     });

  // }

  //Services Calls
}
