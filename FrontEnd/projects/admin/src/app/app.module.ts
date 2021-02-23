import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonsModule, InputsModule, MDBBootstrapModulesPro, ModalModule, PopoverModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, TooltipModule, PopoverModule, 
    FormsModule, ReactiveFormsModule, HttpClientModule,
    ModalModule, WavesModule, InputsModule, ButtonsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    MDBSpinningPreloader,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
