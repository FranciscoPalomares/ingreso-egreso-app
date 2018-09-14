import { UnsetItemsAction } from './../ingreso-egreso/ingreso-egreso.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';

import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private UserSubscription: Subscription = new Subscription();

  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {

      if (fbUser) {
        this.UserSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {
            console.log(usuarioObj)

            const newUser = new User(usuarioObj);

            this.store.dispatch(new SetUserAction(newUser))

            this.usuario = newUser;
          });
      }
      else {
        this.usuario = null;
        this.UserSubscription.unsubscribe();
      }
    })
  }



  crearUsuario(nombre: string, email: string, password: string) {


    this.store.dispatch(new ActivarLoadingAction());


    this.afAuth.auth.
      createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);

        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction);
          })

      }).catch(
        error => {
          console.error(error)
          Swal('Error en el registro', error.message, 'error');
          this.store.dispatch(new DesactivarLoadingAction);
        }


      )
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.
      signInWithEmailAndPassword(email, password).
      then(
        resp => {
          // console.log(resp)
          this.router.navigate(['/']);

          this.store.dispatch(new DesactivarLoadingAction);
        }
      ).catch(
        error => {
          //console.error(error)
          Swal('Error en el login', error.message, 'error');

          this.store.dispatch(new DesactivarLoadingAction);
        }


      )
  }


  logout() {
    this.store.dispatch(new UnsetUserAction())
    this.store.dispatch(new UnsetItemsAction())
    this.router.navigate(['/login']);

    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {

        if (fbUser == null) {
          this.router.navigate(['/login'])
        }

        return fbUser != null
      }


      )
    )
  }

  getUsuario() {
    return { ...this.usuario }
  }

}
