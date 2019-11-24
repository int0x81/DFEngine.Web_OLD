import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-status-logo',
  templateUrl: './status-logo.component.html',
  styleUrls: ['./status-logo.component.sass']
})
export class StatusLogoComponent implements OnInit, AfterViewInit, OnDestroy {

  private darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  private logoDBody: HTMLElement;
  private logoFPart: HTMLElement;
  private logoTopCircle: HTMLElement;
  private logoLowerCircle: HTMLElement;

  private animation: any;
  private originColor: string;
  
  constructor(darkThemeService: DarkThemeService) { 

    this.darkTheme = darkThemeService.getDarkThemeState();

    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => {
      
      this.darkTheme = !this.darkTheme;

      // anime.remove(this.logoTopCircle);
      // anime.remove(this.logoLowerCircle);

      // this.playAnimation(this.darkTheme);
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {

    let statuslogo = document.getElementById('statuslogo');

    this.logoDBody = document.getElementById('slogo-d-body');
    this.logoFPart = document.getElementById('slogo-f-part');
    this.logoTopCircle = document.getElementById('slogo-top-circle');
    this.logoLowerCircle = document.getElementById('slogo-lower-circle');

    //this.playAnimation(this.darkTheme);
  }

  playAnimation(darkTheme: boolean) {
    
    this.animation = anime.timeline({
      easing: 'easeInQuad',
      duration: 200,
      loop: true
    });

    this.animation.add({
      delay: 1000
    });
    this.animation.add({
      targets: this.logoTopCircle,
      fill: '#ff8901'
    });
    this.animation.add({
      targets: this.logoLowerCircle,
      fill: '#ff8901'
    });

    if(darkTheme) {
      this.animation.add({
        targets: this.logoTopCircle,
        fill: '#FFFFFF'
      });
      this.animation.add({
        targets: this.logoLowerCircle,
        fill: '#FFFFFF'
      });
    } else {
      this.animation.add({
        targets: this.logoTopCircle,
        fill: '#000000'
      });
      this.animation.add({
        targets: this.logoLowerCircle,
        fill: '#000000'
      });
    }
    
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
