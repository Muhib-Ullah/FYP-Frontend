import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { AuthModule } from '../auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FeaturesModule } from '../features/features.module';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { ProgressBarComponent } from './progressbar/progressbar.component';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent,
    FeatureCardComponent,
    ProgressBarComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FeaturesModule,
    AuthModule
  ],
  exports: [
    NavbarComponent,
    HomepageComponent,
    ProgressBarComponent
  ]
})
export class SharedModule { }
