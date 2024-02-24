import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { InvalidationComponent } from '../invalidation/invalidation.component';
import { KeyReplacementAssistantComponent } from '../../components/key-replacement-assistant/key-replacement-assistant.component';

export interface InputFormData { device: string, programmer: string}

@Component({
  selector: 'input-form',
  standalone: true,
  imports: [MatGridListModule, MatSelectModule, MatInputModule, MatFormFieldModule, CommonModule, InvalidationComponent, KeyReplacementAssistantComponent],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  @Input() disable: boolean = false;
  @Input() data!: {device: {id: string, name: string}[], programmer: {id: string, name: string}[]};
  @Output() valueChanged = new EventEmitter<InputFormData>;
  @Output() formValid = new EventEmitter<boolean>;
  
  selectedData: InputFormData = {
    device: '',
    programmer: ''
  }
  
 
  changeDevice(event: MatSelectChange) {
    this.selectedData.device = event.value;
    this.valueChanged.emit(this.selectedData);
    this.formValid.emit(!!(this.selectedData.device && this.selectedData.programmer));
  }

  changeProgrammer(event: MatSelectChange) {
    this.selectedData.programmer = event.value;
    this.valueChanged.emit(this.selectedData);
    this.formValid.emit(!!(this.selectedData.device && this.selectedData.programmer));
    
  }
}
