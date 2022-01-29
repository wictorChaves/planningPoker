import { RoomsComponent }       from './pages/rooms/rooms.component';
import { MainComponent }        from './pages/main/main.component';
import { UserLoggedGuard }      from './guards/user-logged.guard';
import { VotesComponent }       from './pages/votes/votes.component';
import { LoginComponent }       from './pages/login/login.component';
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent }       from './pages/tasks/tasks.component';
import { RiskMatrixComponent }  from './pages/risk-matrix/risk-matrix.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path       : '',
    component  : MainComponent,
    canActivate: [UserLoggedGuard],
    children   : [
      {
        path     : 'rooms',
        component: RoomsComponent,
      },
      {
        path     : 'tasks/:id',
        component: TasksComponent,
      },
      {
        path     : 'votes/:id',
        component: VotesComponent,
      },
      {
        path     : 'risk',
        component: RiskMatrixComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
