import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { DateAsAgoPipe } from './date-as-ago.pipe';

@NgModule({
  declarations: [
    DateAsAgoPipe
  ],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule
  ],
  exports: [
    DateAsAgoPipe
  ],
})

export class SharedModule { }
