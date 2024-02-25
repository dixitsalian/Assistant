import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device, DeviceData } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  deviceData = {
    device: [
      { id: 'device1', name: 'Device 1', status: 'valid' },
      { id: 'device2', name: 'Device 2', status: 'valid' },
      { id: 'device3', name: 'Device 3', status: 'valid' },
      { id: 'device4', name: 'Device 4', status: 'valid' },
    ],
    programmer: [
      { id: 'smartCD', name: 'Smart CD' },
      { id: 'smartStickAx', name: 'Smart Stick AX' },
      { id: 'smartDrive', name: 'Smart Drive' },
      { id: 'onlineSW', name: 'Online SW' },
    ],
  };

  getDeviceData(): Observable<DeviceData> {
    return of(this.deviceData);
  }

  updateDeviceDate(id: string): Observable<boolean> {
   const selecteddevice = this.deviceData.device.filter(d => d.id === id)[0];
   selecteddevice.status = 'invalid';
    return of(true)
  }

  private checkIfDeviceNameExists(newDeviceName: string): boolean {
    return (this.deviceData.device.filter(
      (device) => device.name.toLowerCase() === newDeviceName.toLowerCase()
    ).length === 0);
    
  }

  duplicateDevice(deviceName: string): Observable<Device | boolean> {
    if (this.checkIfDeviceNameExists(deviceName)) {
      const newDeviceData = {
        id: `${deviceName}${new Date().getTime()}`,
        name: deviceName,
        status: 'valid'
      };
      this.deviceData.device.push(newDeviceData);
      return of(newDeviceData)
    }
    return of(false);
  }
}
