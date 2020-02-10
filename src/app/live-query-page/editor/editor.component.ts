import { Component, OnInit, OnDestroy } from '@angular/core';
import { async } from '@angular/core/testing';
import { TechnologyMock } from 'src/app/_services/mocks/technology.service.mock';
import { TechnologyServiceDefinition } from 'src/app/_services/technology.service.def';
import { Technology } from 'src/app/_models/technology';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CompilerService } from 'src/app/_services/implementations/compiler.service';
import { CompilerServiceDefinition } from 'src/app/_services/compiler.service.def';
import { CompilerRequest } from 'src/app/_models/compilerRequest';
import { CompilerOptionsService } from 'src/app/_services/implementations/compileroptions.service';
import { RenderingAreaService } from 'src/app/rendering-area/services/rendering-area.service';
import { DataSource } from 'src/app/_models/dataSource';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit, OnDestroy {

  private compilerService: CompilerServiceDefinition;
  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  // When a user types into the textarea, the thread should not
  // fire an update event all the time. This value is the amount
  // of time in milliseconds how long the thread will wait 
  // with the update call to trigger trigger
  private readonly UPDATE_TRESHHOLD: number = 1100;

  textEditorContent: string = ""
  private isWriting: boolean = false;
  private lastChange: number = null; //milliseconds

  constructor(compilerServiceImpl: CompilerService, private compilerOptionsService: CompilerOptionsService, darkThemeService: DarkThemeService, 
    private renderingAreaService: RenderingAreaService) {
    this.compilerService = compilerServiceImpl;
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);

    this.compilerOptionsService.compileColumnLevel = true;
  }

  async ngOnInit() {}

  async onEditorChange() {
    
    this.lastChange = new Date().getSeconds() * 1000 + new Date().getMilliseconds();

    if(this.isWriting) //TODO: CHECK THAT TECHNOLOGIES HAVE BEEN LOADED
      return;
    else {
      this.isWriting = true;

      while((new Date().getSeconds() * 1000 + new Date().getMilliseconds()) - this.UPDATE_TRESHHOLD < this.lastChange % 60000) {
        await (new Promise((resolve) => {
          setTimeout(resolve, 200);
        }));
      };

      if(this.textEditorContent == null || this.textEditorContent.length == 0)
        this.renderingAreaService.clearGRESubject.next();
      else {

        this.renderingAreaService.loadingStateSubject.next();

        let request: CompilerRequest = {
          technologyId: this.compilerOptionsService.selectedTechnology.id,
          columnLevel: this.compilerOptionsService.compileColumnLevel,
          dataSources: [
            {
              name: "LiveQueryTool",
              content: this.textEditorContent
            }
          ]
        }

        await this.compilerService.compile(request).then((landscape) => {
          this.renderingAreaService.renderLandscapeSubject.next(landscape);
        }, () => console.error("Unable to get result from API"));
      }
      
      this.isWriting = false;
    }
  }
    
  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
