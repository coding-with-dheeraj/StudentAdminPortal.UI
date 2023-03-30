import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})

export class ViewStudentComponent implements OnInit{

  //Creating a parameter locally of type string or null or undefined
  //Now, we can assing this parameter inside the ngOnInit()
  studentId: string | null | undefined;

  //Student is coming from the UI Model here
  //We are creating an empty student
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId:'',
    gender:
    {
        id: '',
        description: ''
    },
    address:
    {
        id: '',
        physicalAddress: '',
        postalAddress: ''
    }
  }


  //Read and Injecting studentService and Route in the constructor
  constructor(private readonly studentService: StudentService, private readonly route: ActivatedRoute)
  {}

  //Fetch using id through paramMap by using Route
  //paramMap() is an observable of type PramMap, that has methods we can use to fetch Parameters
  //The parameter 'id' that is being passed here should match the name defined in app-routing.module.ts
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        //If the studentId has a value it goes though this condition
        //Using StudentServie in ngOnInit() so that the service gets student through studentId
        //We can subscribe our service to the subsrcibe() method
        //The student property is returned as a result of successResponse
        if (this.studentId) {
          this.studentService.getStudent(this.studentId)
          .subscribe(
            (successResponse) => {
              this.student= successResponse;
            }
          )
        }
      }
    )
  }
}
