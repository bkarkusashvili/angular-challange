import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ContainerComponent, CoreComponents } from './components';
import { CoreServices } from './services';

@NgModule({
  declarations: [...CoreComponents],
  imports: [CommonModule, HttpClientModule],
  exports: [ContainerComponent],
  providers: [...CoreServices],
})
export class CoreModule {}
