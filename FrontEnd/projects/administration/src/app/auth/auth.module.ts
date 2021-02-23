import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';

import { InputsModule, CardsModule, WavesModule, ButtonsModule, CheckboxModule, IconsModule } from 'ng-uikit-pro-standard'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AuthComponent, SigninComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    InputsModule, CardsModule, WavesModule, ButtonsModule, CheckboxModule, IconsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
