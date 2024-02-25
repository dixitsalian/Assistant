import { NgTemplateOutlet } from '@angular/common';
import { Component, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { InputFormComponent } from '../../common/input-form/input-form.component';
import { DuplicationComponent } from '../../common/duplication/duplication.component';
import { ProgrammingComponent } from '../../common/programming/programming.component';
import { ResultComponent } from '../../common/result/result.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { TemplateService } from '../../service/template.service';
import { DataService } from '../../service/data.service';
import { Device, DeviceData } from '../../interfaces/data.interface';

@Component({
  selector: 'batch-key-duplication-assistant',
  standalone: true,
  imports: [
    InitialPageComponent,
    DuplicationComponent,
    ProgrammingComponent,
    ResultComponent,
    InputFormComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './batch-key-duplication-assistant.component.html',
  styleUrl: './batch-key-duplication-assistant.component.scss',
})
export class BatchKeyDuplicationAssistantComponent {
  @ViewChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  currentTemplate: string = '0';
  activeForm: boolean = false;
  activeInputForm: boolean = false;
  originalDevice!: Device;
  devicesToBeDuplicated: Device[] = [];
  numberOfDeviceDuplication: number = 0;
  deviceData!: DeviceData;
  uniqueDeviceName: boolean = false;

  constructor(
    private templateService: TemplateService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {

    this.dataService.getDeviceData().subscribe(data => {
      this.deviceData = data;
    });
  }

  changeTemplate(action: string) {
    this.activeInputForm = true;
    if (this.currentTemplate === '2' && this.numberOfDeviceDuplication !== 0) {
      --this.numberOfDeviceDuplication;
      this.currentTemplate = (parseInt(this.currentTemplate) - 1).toString();
      return;
    }
    if (action === 'success') {
      this.currentTemplate = (parseInt(this.currentTemplate) + 1).toString();
    } else if (action === 'failure') {
      this.currentTemplate = (parseInt(this.currentTemplate) - 1).toString();
      if (this.currentTemplate === '1') this.activeInputForm = false;
    }
  }

  getCurrentTemplate(): any {
    if (!this.currentTemplate) {
      return;
    }
    return this.templateService.getTemplate(this.currentTemplate);
  }

  ngAfterViewInit() {
    this.templates?.toArray().map((template, index) => {
      this.templateService.registerTemplate(index + '', template);
    });
  }

  onInputFormValueChange(device: string) {
    this.originalDevice = this.deviceData.device.filter(
      (d) => d.id === device
    )[0];
  }

  updateNoOfDuplicationDevice(count: number) {
    this.numberOfDeviceDuplication = +count - 1;
  }

  updateCurrentDeviceData(event: any) {
    this.devicesToBeDuplicated.push(event.device);
  }
  
  onFormValid(event: boolean) {
    this.activeForm = event;
  }
}
