import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeaturesModule } from '../features/features.module';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { ProgressBarComponent } from './progressbar/progressbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent,
    FeatureCardComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FeaturesModule
  ],
  exports: [
    NavbarComponent,
    HomepageComponent,
    ProgressBarComponent
  ]
})
export class SharedModule { }
