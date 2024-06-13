import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './home/home.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        HomeComponent,
        AsideComponent,
        HeaderComponent,
        LoginComponent
    ],
  exports: [
    AsideComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule
    ]
})
export class LayoutModule { }
