import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LiveQueryServiceDefinition } from 'src/app/_services/livequery.service.def';
import { LiveQueryMock } from 'src/app/_services/mocks/livequery.service.mock';
import { Landscape } from 'src/app/_models/landscape';
import { Subscription } from 'rxjs';
import { LiveQueryService } from 'src/app/_services/implementations/livequery.service';
import { RenderingTechnology } from 'src/app/gre/renderingTechnology';
import { GREService } from 'src/app/gre/gre.service';
import * as Noty from 'noty';
import { WebGLHelperService } from 'src/app/_services/implementations/webglhelper.service';

@Component({
  selector: 'app-rendering-area',
  templateUrl: './rendering-area.component.html',
  styleUrls: ['./rendering-area.component.sass']
})
export class RenderingAreaComponent implements OnInit, OnDestroy {
  
  private querySubscription: Subscription;

  liveQueryService: LiveQueryServiceDefinition;
  loadingLandscape: boolean = false;
  textboxFilled: boolean = false;
  webGLSupported: boolean;

  constructor(liveQueryServiceImpl: LiveQueryService, private greService: GREService, private webglHelper: WebGLHelperService) { 
    this.liveQueryService = liveQueryServiceImpl;
  }

  ngOnInit() {

    this.webGLSupported = this.webglHelper.isWebGLSupported();

    this.querySubscription = this.liveQueryService.newQuerySubject.subscribe(async (query) => {

      if(query.query.length == 0) {
        this.greService.clearGRESubject.next();
        this.textboxFilled = false;
        return;
      }

      this.textboxFilled = true;

      this.loadingLandscape = true;
      await this.liveQueryService.getLandscape(query).then((l) => {

        for(let warning of l.warnings)
          this.showWarning(warning);

        for(let error of l.errors)
          this.showError(error);

        if(l.graph != null)
          this.greService.renderGraphSubject.next(l.graph);

      }, 
      (r) => { this.showError("Unable to reach API"); }
      ).finally(() => this.loadingLandscape = false);
 
    });
  }

  private showWarning(message: string): void {
    
    new Noty({
      type: 'warning',
      text: message,
      container: '#notyContainer',
      timeout: 3000,
      theme: 'metroui',
      progressBar: true,
      layout: 'bottomRight', 
      
    }).show();
  }

  private showError(message: string): void {
    
    new Noty({
      type: 'error',
      text: message,
      container: '#notyContainer',
      timeout: 3000,
      theme: 'metroui',
      progressBar: true,
      layout: 'bottomRight', 
      
    }).show();
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}