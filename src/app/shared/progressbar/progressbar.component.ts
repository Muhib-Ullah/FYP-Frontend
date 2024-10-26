import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '../../services/progressbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css'
})

export class ProgressBarComponent implements OnInit {
  isLoading: Observable<boolean> | undefined;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.isLoading = this.progressBarService.isLoading;
  }
}