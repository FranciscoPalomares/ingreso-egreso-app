import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public __autService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data) {
    console.log(data)

    this.__autService.crearUsuario(data.nombre, data.email, data.password)
  }

}
