import { Component, OnInit } from '@angular/core';
import { GlobalEventService } from 'src/app/_services/implementations/globalevent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interactive-logo',
  templateUrl: './interactive-logo.component.html',
  styleUrls: ['./interactive-logo.component.sass']
})
export class InteractiveLogoComponent implements OnInit {

  hovered: boolean = false;

  constructor(private globalEventService: GlobalEventService, private router: Router) {}

  ngOnInit() {
  }

  onLogoClicked(): void {
    this.globalEventService.sidebarToggleSubject.next();
  }

  mouseEnter(): void {

    if(this.router.url == "/dftracker/console")
      this.hovered = true;
  }

  mouseLeave(): void {
    this.hovered = false;
  }
}