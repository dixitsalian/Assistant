import { AfterViewInit, Component, Inject, Type, ViewChild, ViewContainerRef } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent
} from '@angular/material/dialog';
import { delay, of } from 'rxjs';

@Component({
  selector: 'dialog',
  standalone: true,
  imports: [MatDialogContent],
  template: `
      <mat-dialog-content>
        <ng-container #dynamicComponentContainer></ng-container>
      </mat-dialog-content>
  `
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  componentData: {component: Type<unknown>};
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {component: Type<unknown>}
  ) {
    this.componentData = data;
  }

  loadComponent(component: Type<unknown>): void {
    of(null).pipe(
      delay(0)
    ).subscribe(() => {
      this.dynamicComponentContainer.clear();
      this.dynamicComponentContainer.createComponent(component);
    });
  }

  ngAfterViewInit() {
    if (this.componentData && this.componentData.component) {
      this.loadComponent(this.componentData.component);
    }
  }
}
