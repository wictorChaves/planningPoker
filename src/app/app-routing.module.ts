import { RoomsComponent }       from './pages/rooms/rooms.component';
import { MainComponent }        from './pages/main/main.component';
import { UserLoggedGuard }      from './guards/user-logged.guard';
import { VotesComponent }       from './pages/votes/votes.component';
import { LoginComponent }       from './pages/login/login.component';
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path       : '',
    component  : MainComponent,
    canActivate: [UserLoggedGuard],
    children   : [
      {
        path     : 'votes/:id',
        component: VotesComponent,
      },
      {
        path     : 'rooms',
        component: RoomsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
