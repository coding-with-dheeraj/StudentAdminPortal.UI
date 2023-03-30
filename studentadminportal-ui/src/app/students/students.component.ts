import { StudentService } from './student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  //Student property, that imports a list from the UI model
  students: Student[] = [];

  //Defining the displayedColumns to display the listed properties( it is displayed in order)
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', 'edit'];
  
  //Creating a public property, dataSource which is the list is our data source, defined in Angular Material
  //dataSource property is initialized with MatTableDataSource class provided by Angular Material, of type list of student
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  //Here we need to create a property for the Paginator using @ViewChild property
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  //Using @ViewChild property for Sorting
  @ViewChild(MatSort) matSort!: MatSort;

  //
  filterString='';


  //Initialize the student service in the constructor
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
      //Fetch students
      //To be able to fetch students, we need to inject the Student Service
      //We need the subscribe method to initiate the Http Call
      //Subscribe method takes Success of the call and Error of the call
      //and both is console.logged

      //In the success response, we are binding the output to fetch the First and Last Name of Index[0]
      //DataSource is assigned here under success response
      //In this method we will assign the Paginator, which is a property of the Data Source
      //Slly assiging sorting in the method
      this.studentService.getStudents()
      .subscribe(
        (successResponse) => {
          this.students = successResponse;
          this.dataSource = new MatTableDataSource<Student>(this.students);

          if(this.matPaginator){
            this.dataSource.paginator=this.matPaginator;
          }

          if(this.matSort){
            this.dataSource.sort=this.matSort;
          }

        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );

  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
