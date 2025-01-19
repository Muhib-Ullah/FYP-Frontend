import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //api call to summarize the text
  register(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/users/sign-up`, data)
  }

  //api call to summarize the text
  login(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/users/login`, data)
  }

  isloggedIn(){
    return localStorage.getItem('access_token')
  }
}
