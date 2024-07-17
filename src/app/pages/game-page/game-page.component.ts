import { Component, inject, ViewChild } from '@angular/core';
import { SliderComponent } from "../../ui/slider/slider.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {

  readonly MAX_SLIDERS_RANGE = 100;

  readonly MAX_TRIES = 20;
  readonly ALMOST_WIN_DELTA = 3;

  readonly BASE_WIN_AWARD = 10;
  readonly BASE_LOSE = 1;

  cookieServise = inject(CookieService);

  sidersSteps: number = 0;

  isGameOver: boolean = false;
  triesCounter: number = 0;

  randomNumber0: number = 0;
  randomNumber1: number = 0;
  randomNumber2: number = 0;

  delta: number = 0;

  @ViewChild("slider0") slider0!: SliderComponent;
  @ViewChild("slider1") slider1!: SliderComponent;
  @ViewChild("slider2") slider2!: SliderComponent;

  get triesLeft() {
    return this.MAX_TRIES - this.triesCounter;
  }

  ngOnInit() {
    if (this.cookieServise.check("savedSlidersSteps")) {
      this.sidersSteps = +this.cookieServise.get("savedSlidersSteps");
    } else {
      this.cookieServise.set("savedSlidersSteps", this.sidersSteps.toString());
    }

    if (this.sidersSteps <= 1) {
      this.randomNumber0 = Math.floor(Math.random() * this.MAX_SLIDERS_RANGE);
      this.randomNumber1 = Math.floor(Math.random() * this.MAX_SLIDERS_RANGE);
      this.randomNumber2 = Math.floor(Math.random() * this.MAX_SLIDERS_RANGE);
    } else {
      this.randomNumber0 = (this.MAX_SLIDERS_RANGE / this.sidersSteps) * Math.floor(Math.random() * (this.sidersSteps + 1));
      this.randomNumber1 = (this.MAX_SLIDERS_RANGE / this.sidersSteps) * Math.floor(Math.random() * (this.sidersSteps + 1));
      this.randomNumber2 = (this.MAX_SLIDERS_RANGE / this.sidersSteps) * Math.floor(Math.random() * (this.sidersSteps + 1));
    }
  }

  calculate() {
    this.delta = 0;
    this.delta += Math.abs(this.slider0.sliderValue - this.randomNumber0);
    this.delta += Math.abs(this.slider1.sliderValue - this.randomNumber1);
    this.delta += Math.abs(this.slider2.sliderValue - this.randomNumber2);

    this.triesCounter++;

    if (this.triesCounter >= this.MAX_TRIES || this.delta === 0) {
      this.isGameOver = true;
    }
  }

  refresh() {
    window.location.reload();
  }
}
