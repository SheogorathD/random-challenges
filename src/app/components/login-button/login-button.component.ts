import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent implements OnInit {
  @Input() color = 'accent';

  constructor(public authService: AuthService) {}

  gitLogIn() {
    this.authService.GitHubAuth();
  }

  ngOnInit(): void {}
}
