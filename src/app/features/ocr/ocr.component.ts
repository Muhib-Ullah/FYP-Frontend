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

  constructor(private Toast: ToastrService, private OcrService: OCRService) { }

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
      })
    }
    else if(this.selectedFileType=='.pdf') {
      this.OcrService.scanOCRPdf(this.selectedPdfData).subscribe((response)=> {
        if(response.status) {
          this.PdfResponseData = response.data;
          this.showImageText = response.data[0];
          this.pdfTotalPages = response.data.length;
        }
      })
    }
  }

  generateSampleImage(){
    console.log('i ran')
  }
}
