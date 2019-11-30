import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {

  showColumns: boolean = false;
  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(darkThemeService: DarkThemeService, private zone: NgZone) { 
    this.darkTheme = darkThemeService.getDarkThemeState();

    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => {
      this.darkTheme = !this.darkTheme;
    });
  }

  ngOnInit() {
  }

  onShowOptionsChange() {
    //render new graph
    this.zone.run(() => this.showColumns = !this.showColumns);
    
    console.log(this.showColumns);
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
