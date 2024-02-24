import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface Device {
  name: string;
  id: string;
}

@Component({
  selector: 'result',
  standalone: true,
  imports: [NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnChanges{
  @Input() deviceNames!: Device | Device[];
  public Array = Array;
  public deviceNamesArray!: Device[];
  public deviceNamesObject!: Device;

  ngOnChanges(changes: SimpleChanges): void {
    if (Array.isArray(this.deviceNames)) {
      this.deviceNamesArray = this.deviceNames;
    } else {
      this.deviceNamesObject = this.deviceNames;
    }
  }
}
