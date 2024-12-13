import { Component } from '@angular/core';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrl: './authpage.component.css'
})
export class AuthpageComponent {
  currentView: string = 'login';

  switchView(view: 'login' | 'register') {
    this.currentView = view;
  }
}
