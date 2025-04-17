import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/enviroment';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  loggedInUser = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserfromToken() {
    const userToken = localStorage.getItem('access_token');
    if(!userToken){
      this.userSubject.next(null)
      return
    }
    try {
      const decodedToken: any = jwtDecode(userToken); 
      this.userSubject.next(decodedToken);
    } catch (error) {
      console.error('Error decoding token', error);
      this.userSubject.next(null);
    }
  }

  register(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/users/sign-up`, data)
  }

  login(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/users/login`, data)
  }

  isloggedIn(){
    return localStorage.getItem('access_token')
  }
}
