import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {

  sidebarOpen: boolean = false;
  darkTheme: boolean;

  sidebarSubscription: Subscription;
  darkThemeSubscription: Subscription;

  constructor(private globalEventService: GlobalEventService, private darkThemeService: DarkThemeService) {
    this.darkTheme = this.darkThemeService.getDarkThemeState();
  }

  ngOnInit() {
    this.sidebarSubscription = this.globalEventService.sidebarToggleSubject.subscribe(() => this.sidebarOpen = !this.sidebarOpen);
    this.darkThemeSubscription = this.darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnDestroy() {
    this.sidebarSubscription.unsubscribe();
    this.darkThemeSubscription.unsubscribe();
  }
}