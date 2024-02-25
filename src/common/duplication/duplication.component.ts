import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Device } from '../result/result.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'duplication',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatButtonModule, NgIf, ReactiveFormsModule, CommonModule],
  providers: [DataService],
  templateUrl: './duplication.component.html',
  styleUrl: './duplication.component.scss',
})
export class DuplicationComponent implements OnInit {

  
  @Output() nextClicked = new EventEmitter<{ state: string }>();
  @Output() onDeviceChanged = new EventEmitter<{device :Device}>();
  deviceNameField = new FormControl('', [Validators.required, Validators.email]);
  
  ngOnInit(): void { }
  
  constructor(private dataService: DataService) {}

  onNextClick() {
    if (!this.deviceNameField.value) {
      this.deviceNameField.setErrors({ 'uniqueName': true });
      return;
    }
    this.dataService.duplicateDevice(this.deviceNameField.value).subscribe(
      (response) => {
        if (response) {
          this.onDeviceChanged.emit({'device': response as Device});
          this.nextClicked.emit({ state: 'success' });
        } else {
          this.deviceNameField.setErrors({ 'uniqueName': true });
        }
      }
    )
    
  }

  onDeviceNameChanged(name: string): void {
    this.deviceNameField.setErrors({ 'uniqueName': false });
  }
}
