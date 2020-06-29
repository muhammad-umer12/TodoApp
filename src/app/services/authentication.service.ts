import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  baseUri:string = 'http://localhost:3500/user';

  RegisterUser(data: any){
 
     return this.http.post(this.baseUri,data)
  }

  Authenticate(data:any){
 
    return this.http.post(this.baseUri+'/login',data)
  }
  
}
