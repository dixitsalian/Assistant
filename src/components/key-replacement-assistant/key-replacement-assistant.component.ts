import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { DuplicationComponent } from '../../common/duplication/duplication.component';
import { InvalidationComponent } from '../../common/invalidation/invalidation.component';
import { ProgrammingComponent } from '../../common/programming/programming.component';
import { ResultComponent } from '../../common/result/result.component';
import { TemplateService } from '../../service/template.service';
import { NgTemplateOutlet } from '@angular/common';
import { InputFormComponent } from '../../common/input-form/input-form.component';

@Component({
  selector: 'key-replacement-assistant',
  standalone: true,
  imports: [InitialPageComponent, DuplicationComponent, InvalidationComponent, ProgrammingComponent, ResultComponent, InputFormComponent, NgTemplateOutlet],
  templateUrl: './key-replacement-assistant.component.html',
  styleUrl: './key-replacement-assistant.component.scss'
})
export class KeyReplacementAssistantComponent implements OnInit {
  @ViewChildren(TemplateRef) templates!: QueryList<TemplateRef<unknown>>;

  currentTemplate: string = '0';
  activeForm: boolean = false;
  activeInputForm: boolean = false;
  currentDevice!: {id: string, name: string};
  deviceData!: {device:  {id: string, name: string}[], programmer: {id: string, name: string}[]};
  
  constructor(private templateService: TemplateService) {}
  ngOnInit(): void {
    this.deviceData = {
      device: [
        {id: 'device1', name: 'Device 1'},
        {id: 'device2', name: 'Device 2'},
        {id: 'device3', name: 'Device 3'},
        {id: 'device4', name: 'Device 4'}
      ],
      programmer: [
        {id: 'smartCD', name: 'Smart CD'},
        {id: 'smartStickAx', name: 'Smart Stick AX'},
        {id: 'smartDrive', name: 'Smart Drive'},
        {id: 'onlineSW', name: 'Online SW'},
      ]
    };
  }

  changeTemplate(action: string): void {
    this.activeInputForm = true;
    if (action === 'success') {
      this.currentTemplate = (parseInt(this.currentTemplate) + 1).toString();
    } else if (action === 'failure') {
      this.currentTemplate = (parseInt(this.currentTemplate) - 1).toString();
      this.activeInputForm = false;
    }
    
  }

  getCurrentTemplate(): TemplateRef<unknown> | undefined {
    if (!this.currentTemplate) {
      return;
    }
    return this.templateService.getTemplate(this.currentTemplate);
  }

  ngAfterViewInit(): void {
    this.templates?.toArray().map((template, index) => {
      this.templateService.registerTemplate(`${index}`, template);
    });
  }

  onInputFormValueChange(device: string): void {
    this.currentDevice = this.deviceData.device.filter(d => d.id === device)[0];
  }

  onFormValid(event: boolean): void {
    this.activeForm = event;
  }

}
