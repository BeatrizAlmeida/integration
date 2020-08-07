import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiURL:string = 'http://localhost:8000/api/';

  
  

  constructor(public http: HttpClient) { }

  getListRepublics(): Observable<any>{
    return this.http.get(this.apiURL + 'listRepublic');
  }

  getRepublicWithComments($republica_id): Observable<any>{
    
    return this.http.get(this.apiURL + 'showRepublicWithComments/' +  $republica_id );
  }
}
