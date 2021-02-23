import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule, InputsModule, MDBBootstrapModulesPro, MDBSpinningPreloader, ModalModule, PopoverModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

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
