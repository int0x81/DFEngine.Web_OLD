import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RenderingAreaService } from './services/rendering-area.service';
import * as Noty from 'noty';
import { WebGLHelperService } from 'src/app/_services/implementations/webglhelper.service';

@Component({
  selector: 'app-rendering-area',
  templateUrl: './rendering-area.component.html',
  styleUrls: ['./rendering-area.component.sass']
})
export class RenderingAreaComponent implements OnInit, OnDestroy {
  
  private landscapeSubscription: Subscription;
  loadingLandscape: boolean = false;
  
  webGLSupported: boolean;

  constructor(private renderingAreaService: RenderingAreaService, private webglHelper: WebGLHelperService) {}

  ngOnInit() {

    this.webGLSupported = this.webglHelper.isWebGLSupported();

    this.landscapeSubscription = this.renderingAreaService.renderLandscapeSubject.subscribe((landscape) => {

      for(let warning of landscape.warnings)
        this.showWarning(warning);
    
      for(let error of landscape.errors)
        this.showError(error);
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
    this.landscapeSubscription.unsubscribe();
  }
}