import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { FaqComponent } from './faq/faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccordionModule, ButtonsModule, CardsModule, MDBBootstrapModulesPro, WavesModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FaqCreateComponent } from './faq/faq-create/faq-create.component';
import { Faq1CreateComponent } from './faq/faq1-create/faq1-create.component';
import { Faq1ListComponent } from './faq/faq1-list/faq1-list.component';
import { AppLinksComponent } from './app-links/app-links.component';
import { EmailComponent } from './email/email.component';
import { SmsComponent } from './sms/sms.component';
import { ApiComponent } from './api/api.component';


@NgModule({
  declarations: [CmsComponent, FaqComponent, ContactUsComponent, AboutUsComponent, FaqCreateComponent, Faq1CreateComponent, Faq1ListComponent, AppLinksComponent, EmailComponent, SmsComponent, ApiComponent],
  imports: [
    CommonModule, AccordionModule,
    ButtonsModule, WavesModule, CardsModule, AngularEditorModule,
    FormsModule, HttpClientModule, ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    CmsRoutingModule
  ]
})
export class CmsModule { }
