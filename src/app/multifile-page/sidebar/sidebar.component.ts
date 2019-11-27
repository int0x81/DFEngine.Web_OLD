import { Component, OnInit, OnDestroy } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(darkThemeService: DarkThemeService) { 
    this.darkTheme = darkThemeService.getDarkThemeState();

    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => {
      this.darkTheme = !this.darkTheme;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
