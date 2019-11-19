import { Component, OnInit, OnDestroy } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.sass']
})
export class InfoModalComponent implements OnDestroy {

  private darkThemeSubscription: Subscription;
  
  darkTheme: boolean;
  constructor(darkThemeService: DarkThemeService) {

    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}