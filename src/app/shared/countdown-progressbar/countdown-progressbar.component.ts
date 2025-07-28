import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { configuration } from '@configurations';

@Component({
    selector: 'countdown-progressbar',
    templateUrl: 'countdown-progressbar.html',
    styleUrls: ['countdown-progressbar.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CountdownProgressbarComponent implements OnInit, OnDestroy {
  @Input() timerMilliseconds: number;
  @Input() radius: number;
  @Input() strokeWidth: number;

  @Output() countdownEnd: EventEmitter<void>;

  public displaySeconds: number;

  private timerID: number;

  public get timerSeconds(): number {
    return this.timerMilliseconds / 1000;
  }

  public get duration(): string {
    return this.timerSeconds + 's';
  }

  public get svgSize(): number {
    return (this.radius + this.strokeWidth) * 2;
  }

  public get position(): number {
    return -(this.radius + this.strokeWidth);
  }

  public get circleArea(): number {
    return this.radius * Math.PI * 2;
  }

  constructor(
    public changeDetector: ChangeDetectorRef
  ) {
    this.countdownEnd = new EventEmitter();
    this.radius = configuration.countdownProgressbar.radius;
    this.strokeWidth = configuration.countdownProgressbar.strokeWidth;
  }

  public ngOnInit(): void {
    this.startTimer(this.timerSeconds);
  }

  public ngOnDestroy(): void {
    clearInterval(this.timerID);
  }

  public startTimer(duration: number): void {
    this.displaySeconds = duration;

    this.timerID = window.setInterval(() => {
      if (this.displaySeconds > 0) {
        this.displaySeconds--;
        this.changeDetector.markForCheck();
        if (this.displaySeconds === 0) {
          this.countdownEnd.emit();
        }
      } else {
        this.countdownEnd.emit();
      }
    }, 1000);
  }
}
