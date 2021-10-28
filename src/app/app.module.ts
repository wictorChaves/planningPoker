import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule }       from './app-routing.module';
import { AppComponent }           from './app.component';
import { FibonacciDeckComponent } from './components/fibonacci-deck/fibonacci-deck.component';
import { LoginComponent }         from './pages/login/login.component';

import { AngularFireModule }        from '@angular/fire';
import { AngularFirestoreModule }   from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule }    from '@angular/fire/auth';
import { VotesComponent }           from './pages/votes/votes.component';
import { MainComponent }            from './pages/main/main.component';
import { MenuComponent }            from './pages/main/menu/menu.component';
import { RoomsComponent }           from './pages/rooms/rooms.component';
import { ReactiveFormsModule }      from '@angular/forms';
import { LoadingComponent }         from './components/loading/loading.component';

const config = {
  apiKey           : "AIzaSyDEMf3XzmfjVr8jt7XgUikz3w9Xwgt15XM",
  authDomain       : "planningpoker-ed055.firebaseapp.com",
  projectId        : "planningpoker-ed055",
  storageBucket    : "planningpoker-ed055.appspot.com",
  messagingSenderId: "1082193721806",
  appId            : "1:1082193721806:web:2e7ec1a52c7708783b539f",
  measurementId    : "G-1EDZYEV0EL"
};

@NgModule({
  declarations: [
    AppComponent,
    FibonacciDeckComponent,
    LoginComponent,
    VotesComponent,
    MainComponent,
    MenuComponent,
    RoomsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
