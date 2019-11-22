import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import * as hljs from 'highlight.js';
import * as sqlSyntax from 'highlight.js/lib/languages/SQL';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.sass']
})
export class InfoModalComponent implements OnDestroy, AfterViewInit {
  @ViewChild('code', {static: true})
  codeElement: ElementRef;

  private darkThemeSubscription: Subscription;
  
  darkTheme: boolean;
  constructor(darkThemeService: DarkThemeService) {

    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngAfterViewInit() {
    //hljs.registerLanguage()
    hljs.highlightBlock(this.codeElement.nativeElement);
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}