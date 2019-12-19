import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import { RenderingAreaService } from 'src/app/rendering-area/services/rendering-area.service';
import { CompilerOptionsService } from 'src/app/_services/implementations/compileroptions.service';
import { MultiFileService } from '../services/multifile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {

  showColumns: boolean = false;
  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(darkThemeService: DarkThemeService, private multiFileService: MultiFileService, private compilerOptionsService: CompilerOptionsService) { 
    this.darkTheme = darkThemeService.getDarkThemeState();

    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => {
      this.darkTheme = !this.darkTheme;
    });

    this.compilerOptionsService.compileColumnLevel = this.showColumns;
  }

  ngOnInit() {
  }

  onShowOptionsChange() {
    //render new graph
    this.showColumns = !this.showColumns;
    this.compilerOptionsService.compileColumnLevel = !this.compilerOptionsService.compileColumnLevel;
    this.multiFileService.columnLevelStateSubject.next();
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
