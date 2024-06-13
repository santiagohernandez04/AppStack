import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppsDetailComponent} from "./apps-detail.component";

const routes: Routes = [
  {path:'', component:AppsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsDetailRoutingModule { }
