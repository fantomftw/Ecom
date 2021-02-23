import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppLinksComponent } from './app-links/app-links.component';

import { CmsComponent } from './cms.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EmailComponent } from './email/email.component';
import { FaqCreateComponent } from './faq/faq-create/faq-create.component';
import { FaqComponent } from './faq/faq/faq.component';
import { SmsComponent } from './sms/sms.component';

const routes: Routes = [
  { 
    path: '', component: CmsComponent, children:[
      {
        path:'about-us', component:AboutUsComponent
      },
      {
        path:'faq', children:[
          {
            path:'', redirectTo:'list'
          },
          {
            path:'list', component:FaqComponent
          },
          {
            path:'create', component:FaqCreateComponent
          }
        ]
      },
  
      {
        path:'contact-us', component:ContactUsComponent
      },
      {
        path:'appLinks', component:AppLinksComponent
      },
      {
        path:'email', component:EmailComponent
      },
      {
        path:'sms', component:SmsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
