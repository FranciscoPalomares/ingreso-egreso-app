import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  cargando: boolean;


  constructor(public __autService: AuthService,
    public store: Store<AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('ui')
      .subscribe(
        ui => {
          this.cargando = ui.isLoading
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data) {


    this.__autService.crearUsuario(data.nombre, data.email, data.password)
  }

}
