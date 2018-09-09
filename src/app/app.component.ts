import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ingredoEgresoApp';

  constructor(public __authService: AuthService) {

  }

  ngOnInit() {
    this.__authService.initAuthListener();
  }
}
