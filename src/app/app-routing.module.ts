import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./layout/login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {AppsDetailModule} from "./programs/apps-detail/apps-detail.module";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: LayoutComponent, children: [
      {path:'',loadChildren:()=>import('./layout/home/home.module').then(m=>m.HomeModule)},
      {path:'program',loadChildren:()=>import('./programs/apps-detail/apps-detail.module').then(m=>AppsDetailModule)}

    ]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
