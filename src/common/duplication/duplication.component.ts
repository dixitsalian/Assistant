import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'duplication',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './duplication.component.html',
  styleUrl: './duplication.component.scss'
})
export class DuplicationComponent implements OnInit {
  
  @Input() deviceName!: {id: string, name: string};
  @Output() nextClicked = new EventEmitter<{state: string, device: {id: string, name: string}}>;
  name: string = '';

  ngOnInit(): void {
    this.name = this.deviceName?.name;
  }

  onNextClick() {
    if (this.deviceName) {
      this.deviceName.name = this.name;
    }
    this.nextClicked.emit({state: 'success', device: this.deviceName});
  }

  onDeviceNameChanged(event: string) {
    this.name = event;
    
  }
}
