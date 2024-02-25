export interface Device {
  id: string;
  name: string;
  status: string
}

export interface Programmer {
  id: string;
  name: string;
}

export interface DeviceData {
  device: Device[];
  programmer: Programmer[];
}
