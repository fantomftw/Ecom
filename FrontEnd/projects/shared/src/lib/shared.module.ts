import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { FilterPipe } from './pipe/filter/filter.pipe';



@NgModule({
  declarations: [SharedComponent, FilterPipe],
  imports: [
  ],
  exports: [SharedComponent]
})
export class SharedModule { }
