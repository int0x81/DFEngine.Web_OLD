import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-button',
  templateUrl: './github-button.component.html',
  styleUrls: ['./github-button.component.sass']
})
export class GitHubButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  routeToGitHub() {
    window.open("https://github.com/hansalytics", "_blank");
  }
}