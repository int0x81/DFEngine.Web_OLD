import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';
import { RenderingAreaService } from '../services/rendering-area.service';

@Component({
  selector: 'app-dynamic-rendering-background',
  templateUrl: './dynamic-rendering-background.component.html',
  styleUrls: ['./dynamic-rendering-background.component.sass']
})
export class DynamicRenderingBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;
  private landscapeSubscription: Subscription;
  private clearingSubscription: Subscription;

  private playing: boolean;

  private pathOne;
  private pathTwo;
  private pathThree;
  private pathFour;
  private pathFive;

  cookiesAccepted: boolean;

  constructor(darkThemeService: DarkThemeService, private renderingAreaService: RenderingAreaService) {

    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);

    this.landscapeSubscription = this.renderingAreaService.renderLandscapeSubject.subscribe(() => this.stopAnimation());
    this.clearingSubscription = this.renderingAreaService.clearGRESubject.subscribe(() =>{
      if(!this.playing)
        this.startAnimation();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {

    this.pathOne = document.getElementsByClassName('pathOne');
    this.pathTwo = document.getElementsByClassName('pathTwo');
    this.pathThree = document.getElementsByClassName('pathThree');
    this.pathFour = document.getElementsByClassName('pathFour');
    this.pathFive = document.getElementsByClassName('pathFive');
    
    this.startAnimation();
  }

  private startAnimation() {

    this.playing = true;

    this.playAnimationTimeline(this.pathOne);
    this.playAnimationTimeline(this.pathTwo);
    this.playAnimationTimeline(this.pathFour);
    this.playAnimationTimeline(this.pathFive);

    setTimeout(() => {
      this.playAnimationTimeline(this.pathThree);
    }, 4000);
  }

  private stopAnimation() {

      anime.remove(this.pathOne);
      anime.remove(this.pathTwo);
      anime.remove(this.pathThree);
      anime.remove(this.pathFour);
      anime.remove(this.pathFive);

    anime({
      targets: this.pathOne,
      duration: 400,
      easing: 'linear',
      strokeWidth: 0.5,
      stroke: '#636363'
    });
    anime({
      targets: this.pathTwo,
      duration: 400,
      easing: 'linear',
      strokeWidth: 0.5,
      stroke: '#636363'
    });
    anime({
      targets: this.pathThree,
      duration: 400,
      easing: 'linear',
      strokeWidth: 0.5,
      stroke: '#636363'
    });
    anime({
      targets: this.pathFour,
      duration: 400,
      easing: 'linear',
      strokeWidth: 0.5,
      stroke: '#636363'
    });
    anime({
      targets: this.pathFive,
      duration: 400,
      easing: 'linear',
      strokeWidth: 0.5,
      stroke: '#636363'
    });

    this.playing = false;
  }

  private playAnimationTimeline(items: HTMLCollectionOf<Element>) {

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
    this.landscapeSubscription.unsubscribe();
    this.clearingSubscription.unsubscribe();
  }
}