import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  @Input() enabled: boolean = true;

  @Output() sliderValue: number = 0;

  changeValue(value: number) {
    this.sliderValue = value;
  }
}
