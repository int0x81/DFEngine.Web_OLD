import { Component, OnInit } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';

@Component({
  selector: 'app-darkmode-toggle',
  templateUrl: './darkmode-toggle.component.html',
  styleUrls: ['./darkmode-toggle.component.sass']
})
export class DarkmodeToggleComponent implements OnInit {

  isDarkTheme: boolean;

  constructor(private darkThemeService: DarkThemeService) { 
    this.isDarkTheme = this.darkThemeService.getDarkThemeState();
  }

  ngOnInit() {
  }

  onClick() {
    this.darkThemeService.darkThemeSubject.next();
  }

}
