import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BackendService } from './backend.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [provideHttpClient(), BackendService],
})
export class BackendModule {}
