import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { TodolistComponent } from './todolist.component';

const routes: Routes = [{ path: '', component: TodolistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule]
})
export class TodolistRoutingModule { }
