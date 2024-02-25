import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { DuplicationComponent } from '../../common/duplication/duplication.component';
import { InvalidationComponent } from '../../common/invalidation/invalidation.component';
import { ProgrammingComponent } from '../../common/programming/programming.component';
import { ResultComponent } from '../../common/result/result.component';
import { TemplateService } from '../../service/template.service';
import { NgTemplateOutlet } from '@angular/common';
import { InputFormComponent } from '../../common/input-form/input-form.component';
import { DataService } from '../../service/data.service';
import { Device, DeviceData } from '../../interfaces/data.interface';

@Component({
  selector: 'key-replacement-assistant',
  standalone: true,
  imports: [
    InitialPageComponent,
    DuplicationComponent,
    InvalidationComponent,
    ProgrammingComponent,
    ResultComponent,
    InputFormComponent,
    NgTemplateOutlet
  ],
  templateUrl: './key-replacement-assistant.component.html',
  styleUrl: './key-replacement-assistant.component.scss',
})
export class KeyReplacementAssistantComponent implements OnInit {
  @ViewChildren(TemplateRef) templates!: QueryList<TemplateRef<unknown>>;

  currentTemplate: string = '0';
  activeForm: boolean = false;
  activeInputForm: boolean = false;
  currentDevice!: Device;
  deviceData!: DeviceData;
  uniqueDeviceName: boolean = false;

  constructor(
    private templateService: TemplateService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getDeviceData().subscribe((data) => {
      this.deviceData = data;
      this.currentDevice = data.device[0];
    });
  }

  changeTemplate(action: string): void {
    this.activeInputForm = true;
    if (action === 'success') {
      this.currentTemplate = (parseInt(this.currentTemplate) + 1).toString();
    } else if (action === 'failure') {
      if (this.currentTemplate === '1') this.activeInputForm = false;
      this.currentTemplate = (parseInt(this.currentTemplate) - 1).toString();
    }
  }

  updateCurrentDeviceData(event: any) {
    this.currentDevice = event.device;
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
    this.currentDevice = this.deviceData.device.filter(
      (d) => d.id === device
    )[0];
  }

  onFormValid(event: boolean): void {
    this.activeForm = event;
  }
}
