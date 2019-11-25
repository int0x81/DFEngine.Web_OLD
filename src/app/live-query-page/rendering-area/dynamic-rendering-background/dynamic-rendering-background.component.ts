import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-dynamic-rendering-background',
  templateUrl: './dynamic-rendering-background.component.html',
  styleUrls: ['./dynamic-rendering-background.component.sass']
})
export class DynamicRenderingBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  cookiesAccepted: boolean;

  constructor(darkThemeService: DarkThemeService) {

    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() {}

  ngAfterViewInit() {

    let pathOne = document.getElementsByClassName('pathOne');
    let pathTwo = document.getElementsByClassName('pathTwo');
    let pathThree = document.getElementsByClassName('pathThree');
    let pathFour = document.getElementsByClassName('pathFour');
    let pathFive = document.getElementsByClassName('pathFive');

    this.playAnimationTimeline(pathOne);
    this.playAnimationTimeline(pathTwo);
    this.playAnimationTimeline(pathFour);
    this.playAnimationTimeline(pathFive);

    setTimeout(() => {
      this.playAnimationTimeline(pathThree);
    }, 4000);
  }

  playAnimationTimeline(items: HTMLCollectionOf<Element>) {

    let animation_01 = anime.timeline({
      targets: items,
      loop: true
    });

    animation_01.add({
      delay: 8000,
      duration: 400,
      easing: 'linear',
      stroke: '#ff8901',
    });
    animation_01.add({
      duration: 400,
      easing: 'linear',
      strokeWidth: '2'
    });
    animation_01.add({
      delay: 2000,
      duration: 400,
      easing: 'linear',
      stroke: '#636363',
      strokeWidth: '0.5'
    });
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}