import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import { interval } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'invalidation',
  standalone: true,
  imports: [MatProgressBarModule, MatButtonModule],
  templateUrl: './invalidation.component.html',
  styleUrl: './invalidation.component.scss'
})
export class InvalidationComponent {
 
  @Output() invalidCheckAction = new EventEmitter<string>();
  mode: ProgressBarMode = 'determinate';
  progress = 0;

  ngOnInit(): void {
   
    const delayDuration = 1000;
    const progressInterval = 100;
    const totalSteps = delayDuration / progressInterval;
    interval(progressInterval).pipe(
        take(totalSteps),
        finalize(() => {
          this.progress = 100;
          this.invalidCheckAction.emit('success');
        })
    ).subscribe(() => {
        this.progress += (100 / totalSteps);
    });
  }

  cancelCheck() {
    this.invalidCheckAction.emit('failure');
  }
}
