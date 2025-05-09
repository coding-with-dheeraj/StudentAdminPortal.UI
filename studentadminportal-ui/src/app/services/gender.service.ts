import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl= 'https://localhost:7145';


  constructor(private httpClient: HttpClient) { }

  getGenderList(): Observable<Gender[]> {

    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders')

  }
}
