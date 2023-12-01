import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quotation } from '../allTypes/api';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.Url;


  constructor(private http: HttpClient) { }

  getAllMotors(): Observable<Quotation>
   {
    return this.http.get<Quotation >(this.url+"/MotorQuotaion/AllQuotations");
  }
}
