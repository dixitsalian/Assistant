import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'initial-page',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <div class="sv-kpa-initial-page">
    <div class="title-container">
      <label>Please select device to be replaced</label>
    </div>
    <div class="button-container">
      <button
        mat-flat-button
        color="primary"
        [disabled]="!disable"
        (click)="onNextClick.emit('success')"
      >
        Next
      </button>
    </div>
  </div>`,
  styleUrl: './initial-page.component.scss',
})
export class InitialPageComponent {
  @Input() disable!: boolean;
  @Output() onNextClick = new EventEmitter<string>();
}
