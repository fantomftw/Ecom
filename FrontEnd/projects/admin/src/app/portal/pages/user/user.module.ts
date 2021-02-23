import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ButtonsModule, CardsModule, FileInputModule, IconsModule, MDBBootstrapModulesPro, MdbSelectModule, ModalModule, PopoverModule, TableModule, TooltipModule, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [UserComponent, UserCreateComponent, UserListComponent, ProfileComponent],
  imports: [
    CommonModule,
    ButtonsModule, CardsModule, IconsModule,
    FileInputModule, WavesModule, TableModule,
    MdbSelectModule, FormsModule, ReactiveFormsModule, 
    ModalModule, TooltipModule, PopoverModule,
    MDBBootstrapModulesPro.forRoot(),
    UserRoutingModule
  ]
})
export class UserModule { }
