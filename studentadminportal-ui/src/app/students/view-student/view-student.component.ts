import { GenderService } from './../../services/gender.service';
import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  //Defining a new var
  isNewStudent = false;
  //Defining a new var for Header so that it can be set to the new student functionality
  header = '';

  //Defining a string var for ImageUrl
  displayProfileImageUrl = '';

  //Creating genderList that is taken from UI Models
  genderList: Gender[] = [];

  //Read and Injecting studentService and Route in the constructor
  //Injecting GenderService
  //Injecting SnackBar for displaying update notification
  //Injecting a router
  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router) {}

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

          //Checking if the route contains the keyword "Add"
          //It will be our new Student Functionality

          if(this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
            this.isNewStudent = true;
            this.header = 'Add New Student';

            //We want a new student to have a default image
            this.setImage();
          }

          //Otherwise
          //Existing Students
          else {
            this.isNewStudent = false;
            this.header = 'Edit Students';

            this.studentService.getStudent(this.studentId)
          .subscribe(
            (successResponse) => {
              this.student= successResponse;
              this.setImage();
            },
            (errorResponse) => {
              this.setImage();
            }

          );
          }

          this.genderService.getGenderList()
          .subscribe(
            (successResponse) => {
              this.genderList = successResponse;
            }
          );
        }
      }
    );
  }

  onUpdate(): void {

    //After creating the updateStudent method in the Service, we now have to call the method in the Component
    //Call the student service to update the student

    this.studentService.updateStudent(this.student.id, this.student)
    .subscribe(
      (successResponse) => {
        console.log(successResponse);
        //Show notification using SnackBar
        this.snackbar.open('Student Updated successfully', undefined, {
          duration: 2000
        });
      },
      (errorResponse) => {
       //console.log(errorResponse);

      }
    );


  }


  onDelete(): void {
    //Here we will call the service
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse) => {
        //passing an undefined var because we have no action
        this.snackbar.open('Student deleted successfully', undefined, {
        duration: 2000
        });

        //adding a router to navigate to students url after the snackbar event
        //setting a time out of 2 seconds so that navigation will occer 2 sec after the event
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      },

      (errorResponse) => {
        //Log
      }
    );
  }

  // onAdd Method is implemented here
  onAdd(): void {
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse) => {
        //Show notification using SnackBar
        this.snackbar.open('Student Added successfully', undefined, {
          duration: 2000
        });

        //adding a router to navigate to students url after the snackbar event
        //setting a time out of 2 seconds so that navigation will occer 2 sec after the event
        setTimeout(() => {
          this.router.navigateByUrl('students/${successResponse.id}');
        }, 2000);

      },
      (errorResponse) => {
        //Log
      }
    );
  }

  //Upload image method implemented here
  uploadImage(event: any): void {
    //Checking if student id exists
    if(this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.student.id, file)
      .subscribe (
        (successResponse) => {
          this.student.profileImageUrl = successResponse;
          this.setImage();

        //Show notification using SnackBar
        this.snackbar.open('Profile Image Updated', undefined, {
          duration: 2000
        });


        },
        (errorResponse) => {

        }
      )

    }
  }


  //setImage is implemented here
  private setImage(): void {
    //Checking if student has a profile image

    if(this.student.profileImageUrl) {
      //If image exists, fetch the image by URL, using getImagePath that returns the complete path
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);

    }


    else {
      //If no image is available, display a default
      //The default image saved under assets, its path is provided here
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }

}
