import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  constructor(private http: HttpClient) { }
 
  
  refreshToken=localStorage.getItem('token');
  baseUri:string = 'http://localhost:3500/todo';

  AddData(data: any)
  { 
 
     return this.http.post(this.baseUri,data)
  }
  
  getData()
  {
    return this.http.get(this.baseUri);
  }
  deleteData(id)
  {
  
    return this.http.delete(this.baseUri+'/'+id)
  }
}
