import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponents } from './components';
import { SharedDirectives } from './directives';

@NgModule({
  declarations: [...SharedComponents, ...SharedDirectives],
  imports: [CommonModule],
  exports: [...SharedComponents],
})
export class SharedModule {}
