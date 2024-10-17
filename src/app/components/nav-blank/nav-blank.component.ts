import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  private readonly _Router = inject(Router);
  logOut():void{
    localStorage.removeItem('socialToken');
    this._Router.navigate(['/login']);
  }
}
