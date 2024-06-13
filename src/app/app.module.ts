import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import {LayoutModule} from "./layout/layout.module";
import {AppsDetailComponent} from "./programs/apps-detail/apps-detail.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AppsDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
