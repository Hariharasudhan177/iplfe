import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly apiUrl = "http://localhost:5011/api/authentication"; 

  private authSubject = new BehaviorSubject<any>(this.getToken()); 
  authData$ = this.authSubject.asObservable(); 

  constructor(private httpClient: HttpClient) { 

  }

  signIn(signInData: any): Observable<any>{
    return this.httpClient.post<{token: string}>(`${this.apiUrl}/signin`, signInData).pipe(
      map(response => {
        this.authSubject.next(response.token); 
        this.storeToken(response.token); 
        return {status: true, message: 'Ok'}; 
      }),
      catchError(error => {
        return new Observable(observer => {
          observer.next({ status: false, message: error.error });
          observer.complete();
        })
      })
    ); 
  }

  singUp(signUpData: any): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/signup`, signUpData).pipe(
      map(response => {
        return {status: true, message: 'Ok'}; 
      }),
      catchError(error => {
        return new Observable(observer => {
          observer.next({status: false, message: error.error});
          observer.complete();
        })
      })
    ); 
  }

  verifyEmail(verifyData: any): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/verifyemail`, verifyData).pipe(
      map(response => {
        return {status: true, message: 'Ok'}; 
      }),
      catchError(error => {
        return new Observable(observer => {
          observer.next({status: false, message: error.error});
          observer.complete();
        })
      })
    ); 
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authSubject.next(null);
  }

  private storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getIdFromToken(token: any): string {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ id: string, team: string, isVerified: boolean}>(token);
        return decodedToken.id; 
      } catch {
        this.logout(); 
        return '';
      }
    }

    return '';
  }

  getTeamNameFromToken(token: any): string {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ id: string, name: string, isVerified: boolean}>(token);
        return decodedToken.name; 
      } catch {
        this.logout(); 
        return '';
      }
    }

    return '';
  }

  getIsVerifiedFromToken(token: any): boolean{
    if(token){
      try {
        const decodedToken = jwtDecode<{id: string, name: String, isVerified: boolean}>(token); 
        return decodedToken.isVerified; 
      } catch {
        this.logout();
        return false; 
      }
    }

    return false; 
  }
}
