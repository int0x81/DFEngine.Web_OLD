import { Component, OnInit, OnDestroy } from '@angular/core';
import { async } from '@angular/core/testing';
import { LiveQueryServiceDefinition } from 'src/app/_services/livequery.service.def';
import { LiveQueryMock } from 'src/app/_services/mocks/livequery.service.mock';
import { TechnologyMock } from 'src/app/_services/mocks/technology.service.mock';
import { TechnologyServiceDefinition } from 'src/app/_services/technology.service.def';
import { Technology } from 'src/app/_models/technology';
import { LiveQueryRequest } from 'src/app/_models/livequeryrequest';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import { LiveQueryService } from 'src/app/_services/implementations/livequery.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit, OnDestroy {

  private liveQueryService: LiveQueryServiceDefinition;
  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  // When a user types into the textarea, the thread should not
  // fire an update event all the time. This value is the amount
  // of time in milliseconds how long the thread will wait 
  // with the update call to trigger trigger
  private readonly UPDATE_TRESHHOLD: number = 800;

  textEditorContent: string = ""
  private isWriting: boolean = false;
  private lastChange: number = null; //milliseconds

  constructor(liveQueryServiceImpl: LiveQueryService, darkThemeService: DarkThemeService) {
    this.liveQueryService = liveQueryServiceImpl;
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  async ngOnInit() {}

  async onEditorChange() {
    
    this.lastChange = new Date().getSeconds() * 1000 + new Date().getMilliseconds();

    if(this.isWriting)
      return;
    else {
      this.isWriting = true;

      while((new Date().getSeconds() * 1000 + new Date().getMilliseconds()) - this.UPDATE_TRESHHOLD < this.lastChange % 60000) {
        await (new Promise((resolve) => {
          setTimeout(resolve, 200);
        }));
      };

      let request: LiveQueryRequest = {
        query: this.textEditorContent,
        technologyId: this.liveQueryService.getSelectedTechnology().id
      }

      if(this.textEditorContent != null)
        this.liveQueryService.newQuerySubject.next(request);
      
      this.isWriting = false;
    }
  }
    
  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
