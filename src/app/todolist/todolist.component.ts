import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {TodoserviceService} from '../services/todoservice.service'
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor(public todoservice: TodoserviceService , public router : Router) { }
  data
  
  duplicate_delete;
  list
  ngOnInit(): void {
    this.duplicate_delete=false;
   //get todo list
    this.getList()
    const p= localStorage.getItem('token');
    if(p==null){
      this.router.navigateByUrl('/') 
    }
    

  }
  getList(){
    this.todoservice.getData()
    .subscribe((res)=>{
     
      this.list=res;
    },
    (err)=>{
      console.log(err)
    })
  }
  logout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/')
  }

 add(data){
  if(data.value.trim().length == 0){
    return;
}
   else{
   console.log(data.value)
      this.todoservice.AddData({name: data.value, check:false})
      .subscribe((res)=>{
        console.log(res);
        this.list.push(res)
      },
      (err)=>{
        this.duplicate_delete=true;
        setTimeout(()=>{
          this.duplicate_delete=false;
          
        },3000)
      })
  
 
     
    }
 }

 remove(data){
   
    
    
   this.todoservice.deleteData(data._id)
   .subscribe((res)=>{
  
      
    let index=this.list.indexOf(data)
    this.list.splice(index,1)
   },
   (err)=>{
    this.duplicate_delete=true;
    let index=this.list.indexOf(data)
    this.list.splice(index,1)
    setTimeout(()=>{
      this.duplicate_delete=false
    },3000)
   })
    

 }
 


}
