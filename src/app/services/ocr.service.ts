import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OCRService {

  constructor(private http: HttpClient) { }

  //api call to summarize the text
  // textExtraction(data: any): Observable<any>{
  //   return this.http.post<any>(`${environment.apiUrlOCR}/get-batch-text`, data)
  // }

  scanOCRImage(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrlOCR}/scan-image`, data)
  }

  scanOCRPdf(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrlOCR}/scan-pdf`, data)
  }
}
