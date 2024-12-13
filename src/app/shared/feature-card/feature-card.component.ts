import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.css'
})
export class FeatureCardComponent {
  @Input() ftname! : string;
  @Input() ftdesc! : string;
  @Input() ftimg! : string;
  @Input() ftroute! : string;

  constructor(private router: Router) {}

  navigate() {
    if (this.ftroute) {
      this.router.navigate([this.ftroute]);
    }
  }
}
