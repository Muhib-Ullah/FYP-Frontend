import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcrComponent } from './ocr/ocr.component';
import { TranslationComponent } from './translation/translation.component';
import { SummarizationComponent } from './summarization/summarization.component';

const routes: Routes = [
  {path:'ocr',component: OcrComponent},
  {path: 'summarization', component: SummarizationComponent},
  {path:'translation', component:TranslationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
