import { Student } from './../models/api-models/student.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //We need to define our API connection so that it can communicate with the backend and fetch results back to our fron end

  //We need to create a private variable that takes the url from the API with out the route(/Students)
  //We also need to import HttpClient to make Http Calls
  private baseApiUrl= 'https://localhost:7145';

  //So we can initiate the service by passing it as the argument in the constructor
  constructor(private httpClient: HttpClient) { }

  //We will define a new method to fetch data
  //Returning an observable of type any
  //Since we are using an obesrvable, we have to subscribe in the students.component

  //We are fetching a list of students from API models> Student model
  //This becomes type safe
  getStudent(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }
}
