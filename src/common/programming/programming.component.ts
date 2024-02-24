import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { finalize, interval, take } from 'rxjs';

@Component({
  selector: 'programming',
  standalone: true,
  imports: [MatProgressBarModule, MatButtonModule],
  templateUrl: './programming.component.html',
  styleUrl: './programming.component.scss'
})
export class ProgrammingComponent {
  @Output() programmingAction = new EventEmitter<string>();
  mode: ProgressBarMode = 'determinate';
  progress: number = 0;

  ngOnInit(): void {
   
    const delayDuration = 1000;
    const progressInterval = 100;
    const totalSteps = delayDuration / progressInterval;
    interval(progressInterval).pipe(
        take(totalSteps),
        finalize(() => {
          this.progress = 100;
          this.programmingAction.emit('success');
        })
    ).subscribe(() => {
        this.progress += (100 / totalSteps);
    });
  }

  cancelCheck() {
    this.programmingAction.emit('failure');
  }
}
