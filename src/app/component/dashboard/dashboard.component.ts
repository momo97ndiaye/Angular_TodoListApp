import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArray: Task[] = []; 
  addTaskValue:string ='';
  editTaskValue:string ='';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue='';
    this.addTaskValue='';
    this.taskObj=new Task();
    this.taskArray=[];
    this.getAllTask();
  }
  getAllTask() {
  this.crudService.getAllTask().subscribe(res => {
    this.taskArray = res;
  },err=>{
    alert("Impossible to get all tasks");
  })
  }

  addTask(){
    if (this.addTaskValue!=='') {
      this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert(err);
    });
    }
  }

  editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("Impossible de mettre a jour la tache");
    });
  }

  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("Impossible de supprimer la tache");
    });
  }

  call(etask:Task){
   this.taskObj = etask;
   this.editTaskValue= etask.task_name;
  }
}
