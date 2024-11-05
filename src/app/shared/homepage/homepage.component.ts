import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) {}

  featureCards = [
    {
      ftname: 'OCR Technology',
      ftdesc: 'Easily extract and convert text from images or scanned Urdu documents into editable formats',
      ftimg: 'assets/ocr.png',
      ftroute: 'ocr'
    },
    {
      ftname: 'Summarization',
      ftdesc: 'Quickly summarize lengthy Urdu articles, research papers, or documents into  meaningful text.',
      ftimg: 'assets/summary.png',
      ftroute: 'summarization'
    },
    {
      ftname: 'Translation',
      ftdesc: 'Translate text from multiple languages into Urdu for better communication and understanding.',
      ftimg: 'assets/translation.png',
      ftroute: 'translation'
    },
    {
      ftname: 'Text to Speech',
      ftdesc: 'Effortlessly convert written Urdu text into natural-sounding speech for lingual purposes.',
      ftimg: 'assets/text-to-speech.png',
      ftroute: '/cloud-storage'
    }]

}
