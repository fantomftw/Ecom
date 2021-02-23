import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EaterComponent } from './eater.component';

const routes: Routes = [{ path: '', component: EaterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EaterRoutingModule { }
