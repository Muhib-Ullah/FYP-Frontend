import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcrComponent } from './ocr/ocr.component';
import { TranslationComponent } from './translation/translation.component';
import { SummarizationComponent } from './summarization/summarization.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path:'ocr',component: OcrComponent, canActivate:[authGuard]},
  {path: 'summarization', component: SummarizationComponent, canActivate:[authGuard]},
  {path:'translation', component:TranslationComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
