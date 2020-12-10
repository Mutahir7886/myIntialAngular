import {Injectable, NgZone} from '@angular/core';
import {UserData} from '../classes/userdata';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {FirebaseApp} from '@angular/fire';
import {promises} from "fs";
import {rejects} from "assert";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class Authservice {
  userData: any;

  loginSubscription = new Subject();

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private firebaseApp: FirebaseApp
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }


  // Sign up with email/password
  SignUp(formgroup: any): any {
    return new Promise((resolve, reject) => {
      this.firebaseApp.auth().createUserWithEmailAndPassword(formgroup.value.email, formgroup.value.password)
        .then((result) => {
          const userid = result.user.uid;
          this.loginSubscription.next(true);
          this.firebaseApp.database().ref('users/' + userid).set({
            Email: formgroup.value.email,
            FirstName: formgroup.value.first_name,
            LastName: formgroup.value.last_name,
            title: formgroup.value.title,
            Image: formgroup.value.UserImage,
          }).then((res) => {
            // console.log('success');
            resolve('successful data save');
            localStorage.setItem('USERID', userid);
          }).catch((err) => {
            // console.log('error');
            reject(err.message);
          });
        })
        .catch((error) => {
          // console.log(error);
          // formgroup.value.errorparameter.setValue(error);
          reject(error.message);
        });
    });
  }

  SignIn(email, password): any {
    this.firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userid = result.user.uid;
        console.log(result.user);
        localStorage.setItem('USERID', userid);
        this.loginSubscription.next(true);
        this.router.navigate(['/homepage']);
      }).catch((error) => {
      console.log(error);
    });
  }

  SignOut() {
    this.firebaseApp.auth().signOut().then(() => {
      localStorage.removeItem('USERID');
      console.log('successfully logged out');
      this.router.navigate(['/login']);
      this.loginSubscription.next(false);
    }).catch(err => {
      console.log(err);
    });
  }

  getUserData() {
   return  new Promise((resolve, reject) => {
      this.firebaseApp.database().ref('users/' + localStorage.getItem('USERID')).once('value')
        .then((snapshot) => {
          const Email = snapshot.val().Email;
          const FirstName = snapshot.val().FirstName;
          const LastName = snapshot.val().LastName;
          resolve({email: Email, userFirstName : FirstName , userLastName: LastName });
        }).catch((error) =>
      {
        reject(error.message);
      });
    });
  }
}
