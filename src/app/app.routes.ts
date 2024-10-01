import { Routes } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';

export const routes: Routes = [
    {path:"" , redirectTo:"timeLine" , pathMatch:'full'},
    {path:"timeLine" , component:TimelineComponent , title:'TimeLine'}
];
