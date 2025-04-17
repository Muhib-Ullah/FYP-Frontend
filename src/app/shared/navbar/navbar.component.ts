import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userName: string | null = 'Guest';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe((user) =>{
      this.userName = user.username;
    })
  }
}
