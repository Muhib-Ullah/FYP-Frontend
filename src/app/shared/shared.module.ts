import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeaturesModule } from '../features/features.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FeaturesModule
  ],
  exports: [
    NavbarComponent,
    HomepageComponent
  ]
})
export class SharedModule { }
