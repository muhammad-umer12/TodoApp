import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    create: boolean;
    controlReq:boolean;
    error:boolean;
  constructor(public router:Router,public fb: FormBuilder,private authService:AuthenticationService)
  {
    // Form initialize when instance of component created
   
  }

  

  ngOnInit(): void
  {  const p= localStorage.getItem('token');
  
  if(p != null)
  {
    this.router.navigateByUrl('/todolist') 
  }
 
    this.create=false;
     this.controlReq=true;
     this.error=false;
    this.mainForm();
  }

  form : FormGroup;

  mainForm()
  {
  //Create a reactive form
  this.form = this.fb.group(
  {
  // initializes field value by "" and required,email and minlength validations
  email: ['', [Validators.required,Validators.email]],
  name: ['', Validators.required],
  password: ['', [Validators.required,Validators.minLength(8)]],
 

  })

  }
  // ======myform() ends here=====

  //*********** Register User***********
  
  register(){
  
      this.controlReq=true;
    
      let a = this.form.value
      this.form.reset()
      this.authService.RegisterUser(a)
      .subscribe(
       
        (res) => {
          console.log("duplicate ka response "+ res)
          
          this.controlReq=false;
          this.create=true;
          setTimeout(()=>{this.create=false},4000)
          
       //   this.usedCars.push(res)
  
  
     //     this.ngZone.run(() => this.router.navigateByUrl('/admin'))
        }, (error) => {
          console.log("duplicate ka response error mai"+ error)
          this.controlReq=false;

          
          this.create=false;
          this.error=true;
          setTimeout(()=>{this.error=false},4000)
        }); 
    
  }
  // Getter to acces form filds to perfom validations
  get myForm(){
    return this.form.controls;
  }


}
