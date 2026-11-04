import { Component, ElementRef, ViewChild } from '@angular/core';
import studentsList from "./students.json"
import { Student } from '../student/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  imports: [Student, FormsModule],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})

export class StudentsList {
  constructor(){ }

  @ViewChild("txtName") _txtName! : ElementRef<HTMLElement>;

  studentName:string=""
  studentGender:string="M"
  studentPresent:boolean=false;
  studentCity:string=""

  // Creo una property che si chiama students
  students:any[] = studentsList

  cities=['Fossano', 'Bra', 'Cuneo', 'Alba']

  onAddStudent(){
    console.log(this.studentName, this.studentGender, this.studentCity, this.studentPresent)
    let newStudent ={
      "name":this.studentName,
      "gender":this.studentGender,
      "city":this.studentCity,
      "present":this.studentPresent
    }

    this.students.unshift(newStudent)
    this.studentName=""
    this.studentGender=""
    this.studentPresent = false
    this.studentCity=""

    // document.getElementById("txtName")?.focus()
    // nativeElement consente di accedere al contenuto html del templateReference
    this._txtName.nativeElement.focus()
  }

  onDeleteStudent(currentStudentName:string){
      this.students = this.students.filter((item)=>{
        return item.name != currentStudentName
      })
  }

}
