import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({

  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public fb: FormBuilder, private router: Router,private authService:AuthenticationService) { 
    // Form initialize when instance of component created
    
   
  }
  error;
  success;

  ngOnInit(): void {
    const p= localStorage.getItem('token');
    
    if(p != null)
    {
      this.router.navigateByUrl('/todolist') 
    }

    this.mainForm();
    this.success=false;
    this.error=false;

  }
   
  form : FormGroup;

  mainForm()
  {
  //Create a reactive form
  this.form = this.fb.group(
  {
  // initializes field value by "" and required,email and minlength validations
  email: ['', [Validators.required,Validators.email]],
  password: ['', [Validators.required,Validators.minLength(8)]],
  })

  }
  
  // ======myform() ends here=====

  //*********** Register User***********
  
  authenticate(){
    
    let a = this.form.value
    this.form.reset()
    this.authService.Authenticate(a)
    .subscribe(
     
      (res)=>{
         a= res.valueOf()
         localStorage.setItem('token' , a.token );
          localStorage.setItem('_id' , a.id );

          this.success=true;
          setTimeout(()=>{
            this.success=false;
            this.router.navigateByUrl('/todolist')
          },2000)
      },
      (err)=>{
           this.error=true;
           setTimeout(()=>{
            this.error=false;
          
          },6000)
      }
    )
    
  }
  // Getter to acces form filds to perfom validations
  
  get myForm(){
    return this.form.controls;
  }
  
}
