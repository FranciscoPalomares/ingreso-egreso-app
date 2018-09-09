import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public __authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log(data)

    this.__authService.login(data.email, data.password)
  }

}


