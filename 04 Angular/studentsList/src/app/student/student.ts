import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student',
  imports: [CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})


export class Student {
  
  /* names:string[] = ['pippo', 'pluto', 'minnie', 'paperino']
  student:any ={
    name:"pippo",
    city:"Fossano",
    gender:"M",
    present:false
  } */

  @Input() student:any

  getStyle(student:any){
    const backgroundColor:string = student.present ? '#eee' : '#ccc'
    const color:string = student.present ? '' : '#F00'
    const bold:string = student.present ? '' : 'bold'
    return {backgroundColor, color, "font-weight":bold}
  }

  gestisciPresenza(){
     this.student.present = !this.student.present 
  }

  ngOnInit(){
    /* ngOniti viene richiamato ogni volta che il componente 
      compare a video
      let n = Math.floor(this.names.length*Math.random())
      this.student.name=this.names[n]
    */

  }

}
