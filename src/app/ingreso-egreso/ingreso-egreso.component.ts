import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';


import Swal from 'sweetalert2'

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;

  tipo = 'ingreso';


  loadingSubs: Subscription = new Subscription();

  cargando: boolean;

  constructor(public __ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSubs = this.store.select('ui').subscribe(
      ui => this.cargando = ui.isLoading
    )


    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, [Validators.min(0), Validators.required])
    })
  }


  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch(new ActivarLoadingAction())

    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });

    console.log(ingresoEgreso)


    this.__ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction())
        Swal('Creado', ingresoEgreso.descripcion, 'success')
        this.forma.reset({
          monto: 0
        });
      })
      .catch(
        err => {
          this.store.dispatch(new DesactivarLoadingAction())
          console.log(err);
        }
      )


  }

}
