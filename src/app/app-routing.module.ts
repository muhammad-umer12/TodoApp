import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent} from './signup/signup.component'
import { SigninComponent } from './signin/signin.component' 
const routes: Routes = [

    {path : 'signup', component: SignupComponent},
    {path : '', component: SigninComponent},

    { path: 'todolist', loadChildren: () => import('./todolist/todolist.module').then(m => m.TodolistModule) }

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  