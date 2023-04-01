import { UpdateStudentRequest } from './../models/api-models/update-student-request.model';
import { Student } from './../models/api-models/student.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  //This method returns a single student using HttpClient
  //The data is fetched from the API models (Student interface)
  //Passing studentId as the parameter and stirng as its type, which is Observable of type Student
  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  //Method to update student details
  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {

    const updateStudentRequest: UpdateStudentRequest = {
      "firstName": studentRequest.firstName,
      "lastName": studentRequest.lastName,
      "dateOfBirth": studentRequest.dateOfBirth,
      "email": studentRequest.email,
      "mobile": studentRequest.mobile,
      "genderId": studentRequest.genderId,
      "physicalAddress": studentRequest.address.physicalAddress,
      "postalAddress": studentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }

  //Implementing delete method in Service.ts
  //Here the type student is of API models
  //The return type is an Observable of type Student
  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }
}
