import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { OcrComponent } from './ocr/ocr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SummarizationComponent } from './summarization/summarization.component';
import { TranslationComponent } from './translation/translation.component';
import { TexttospeechComponent } from './texttospeech/texttospeech.component';

@NgModule({
  declarations: [
    OcrComponent,
    SummarizationComponent,
    TranslationComponent,
    TexttospeechComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FeaturesRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    })
  ]
})
export class FeaturesModule { }
