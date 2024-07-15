import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  @Input() maxRange: number = 100;
  @Input() enabled: boolean = true;

  @Output() sliderValue: number = 0;

  // if 0 - there is no steps
  sliderStep: number = 0;

  @Input() set steps(value: number) {
    if (value <= 1) {
      this.sliderStep = 0;
    } else {
      this.sliderStep = this.maxRange / value;
    }
  };

  changeValue(value: number) {
    this.sliderValue = value;
  }
}
