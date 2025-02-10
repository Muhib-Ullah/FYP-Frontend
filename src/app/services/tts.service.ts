import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private http: HttpClient) { }

  convertToSpeech(data: any) :Observable<any> {
    return this.http.post<any>(`${environment.apiUrlTTS}/tts`, data)
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Blob([bytes], { type: mimeType });
  }
}
