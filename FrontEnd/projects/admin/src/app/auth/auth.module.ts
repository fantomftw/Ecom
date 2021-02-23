import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, CardsModule, CollapseModule, IconsModule, InputsModule, MDBBootstrapModulesPro, WavesModule } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [AuthComponent, SigninComponent],
  imports: [
    CommonModule,
    InputsModule, CardsModule, WavesModule, ButtonsModule, CollapseModule, CardsModule, IconsModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
