import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  //api call to translate the text
  translateText(data:any) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/services/translate`, data)
  }
}
