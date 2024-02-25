import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { KeyReplacementAssistantComponent } from '../key-replacement-assistant/key-replacement-assistant.component';
import { MatButtonModule } from '@angular/material/button';
import { BatchKeyDuplicationAssistantComponent } from '../batch-key-duplication-assistant/batch-key-duplication-assistant.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-stroked-button color="primary" (click)="openDialog(0)">Key Duplication Assistant</button>
              <button mat-stroked-button color="primary" (click)="openDialog(1)">Batch Key Replacement Assistant</button>`,
  styles: `button {  margin: 1em; }`
})
export class AppComponent {
  components: unknown[] = [];
  constructor(public dialog: MatDialog) {
    this.components.push(KeyReplacementAssistantComponent);
    this.components.push(BatchKeyDuplicationAssistantComponent)
  }
  openDialog(component: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: {component: this.components[component]}
    });
  }
}
