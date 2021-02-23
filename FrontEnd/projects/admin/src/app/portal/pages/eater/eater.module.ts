import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EaterRoutingModule } from './eater-routing.module';
import { EaterComponent } from './eater.component';


@NgModule({
  declarations: [EaterComponent],
  imports: [
    CommonModule,
    EaterRoutingModule
  ]
})
export class EaterModule { }
