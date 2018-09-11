import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  cargando: boolean;

  constructor(public __authService: AuthService,
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

  onSubmit(data: any) {


    this.__authService.login(data.email, data.password)
  }

}


