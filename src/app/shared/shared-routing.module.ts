import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcrComponent } from '../features/ocr/ocr.component';
import { SummarizationComponent } from '../features/summarization/summarization.component';
import { TranslationComponent } from '../features/translation/translation.component';

const routes: Routes = [
  {path:'ocr',component: OcrComponent},
  {path: 'summarization', component: SummarizationComponent},
  {path:'translation', component:TranslationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
