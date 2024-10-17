import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  loadingBtn:boolean = false;
  errorMsg:string = '';
  loginForm: FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required]]
  });

  login():void{
    if(this.loginForm.valid)
    {
      this.loadingBtn = true;
      this._UsersService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          localStorage.setItem('socialToken' , res.token);
          this._Router.navigate(['/timeLine'])
          this.loadingBtn = false;
          this.errorMsg = '';
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
