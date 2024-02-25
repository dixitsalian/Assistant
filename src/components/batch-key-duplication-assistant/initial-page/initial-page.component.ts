import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'initial-page',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './initial-page.component.html',
  styleUrl: './initial-page.component.scss'
})
export class InitialPageComponent {
  @Input() disable!: boolean;
  @Output() onNextClick = new EventEmitter<{action: string, data: number}>;
  noOfDevice: number = 0;

}
