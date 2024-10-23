import { Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { authGaurdGuard } from './core/auth-guard.guard';
import { blankGuardGuard } from './core/blank-guard.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {path:"" , redirectTo:"login" , pathMatch:'full'},
    {path:"signup" , component:SignupComponent , canActivate:[blankGuardGuard] , title:'SignUp'},
    {path:"login" , component:LoginComponent , canActivate:[blankGuardGuard]  , title:'Login'},
    {path:"timeLine" , component:TimelineComponent, canActivate:[authGaurdGuard]  , title:'TimeLine'},
    {path:"timeline" , component:TimelineComponent, canActivate:[authGaurdGuard]  , title:'TimeLine'},
    {path:'**' , component:NotfoundComponent , title:'NotFound'}
];
