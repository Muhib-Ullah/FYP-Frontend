import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SummarizationService {

  constructor(private http: HttpClient) { }

  //api call to summarize the text
  summarizeText(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/summarize`, data)
  }
}
