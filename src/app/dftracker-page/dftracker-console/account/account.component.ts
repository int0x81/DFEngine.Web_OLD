import { Component, OnInit, OnDestroy } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit, OnDestroy {

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(private darkThemeService: DarkThemeService) { 
    this.darkTheme = this.darkThemeService.getDarkThemeState();
  }

  ngOnInit() {
    this.darkThemeSubscription = this.darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
