import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  loadingBtn:boolean = false;
  errorMsg:string = '';
  signUpForm: FormGroup = this._FormBuilder.group({
    name:[null , [Validators.required , Validators.minLength(2)]],
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword:[null , [Validators.required]],
    dateOfBirth:[null , [Validators.required]],
    gender:[null , [Validators.required]]
  } , {validators : this.confirmPassword});


  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value == g.get('rePassword')?.value)
      return null;
    else 
      return {mismatch:true};

  }
  signup():void{
    if(this.signUpForm.valid)
    {
      this.loadingBtn = true;
      this._UsersService.signUp(this.signUpForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.loadingBtn = false;
          this.errorMsg = '';
          this._Router.navigate(['/login']);
        },
        error:(err)=>{
          console.log(err.error.error)
          this.errorMsg = err.error.error;
          this.loadingBtn = false;
        }
      })
    }
  }

}
