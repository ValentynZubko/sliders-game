import { Component, ViewChild } from '@angular/core';
import { SliderComponent } from "../../ui/slider/slider.component";

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {

  readonly MAX_TRIES = 5;

  isGameOver: boolean = false;
  triesCounter: number = 0;

  randomNumber0: number = 0;
  randomNumber1: number = 0;
  randomNumber2: number = 0;

  delta: number = 0;

  @ViewChild("slider0") slider0!: SliderComponent;
  @ViewChild("slider1") slider1!: SliderComponent;
  @ViewChild("slider2") slider2!: SliderComponent;

  ngOnInit() {
    this.randomNumber0 = Math.floor(Math.random() * 100);
    this.randomNumber1 = Math.floor(Math.random() * 100);
    this.randomNumber2 = Math.floor(Math.random() * 100);

    console.log(this.randomNumber0);
    console.log(this.randomNumber1);
    console.log(this.randomNumber2);
  }

  calculate() {
    this.delta = 0;
    this.delta += Math.abs(this.slider0.sliderValue - this.randomNumber0);
    this.delta += Math.abs(this.slider1.sliderValue - this.randomNumber1);
    this.delta += Math.abs(this.slider2.sliderValue - this.randomNumber2);

    this.triesCounter++;

    if (this.triesCounter >= this.MAX_TRIES) {
      this.isGameOver = true;
    }
  }
}
