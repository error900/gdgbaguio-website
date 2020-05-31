import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomizerComponent } from './randomizer.component';

@NgModule({
  declarations: [
    RandomizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RandomizerComponent
  ]
})
export class RandomizerModule { }
