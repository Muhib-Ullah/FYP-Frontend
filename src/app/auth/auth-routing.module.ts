import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthpageComponent } from './authpage/authpage.component';

const routes: Routes = [
  {path:'auth', component: AuthpageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
