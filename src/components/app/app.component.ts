import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { KeyReplacementAssistantComponent } from '../key-replacement-assistant/key-replacement-assistant.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-stroked-button color="primary" (click)="openDialog()">Key Duplication Assistant</button>`
})
export class AppComponent {
  constructor(public dialog: MatDialog) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {component: KeyReplacementAssistantComponent}
    });
  }
}
