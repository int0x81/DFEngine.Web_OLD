import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';

@Component({
  selector: 'app-status-logo',
  templateUrl: './status-logo.component.html',
  styleUrls: ['./status-logo.component.sass']
})
export class StatusLogoComponent implements OnInit, OnDestroy {

  private darkTheme: boolean;
  private darkThemeSubscription: Subscription;
  
  constructor(darkThemeService: DarkThemeService) { 

    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
