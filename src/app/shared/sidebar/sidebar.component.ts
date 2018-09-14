import { IngresoEgresoService } from './../../ingreso-egreso/ingreso-egreso.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  nombre: string;
  subscription: Subscription = new Subscription()
  constructor(public __authService: AuthService,
    public ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(
        auth => {
          this.nombre = auth.user.nombre
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {

    this.__authService.logout();

    this.ingresoEgresoService.cancelarSubscription();
  }

}
