import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TechnologyServiceDefinition } from 'src/app/_services/technology.service.def';
import { Technology } from 'src/app/_models/technology';
import { TechnologyMock } from 'src/app/_services/mocks/technology.service.mock';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';
import { TechnologyService } from 'src/app/_services/implementations/technology.service';
import { CompilerOptionsService } from 'src/app/_services/implementations/compileroptions.service';

@Component({
  selector: 'app-tech-selector',
  templateUrl: './tech-selector.component.html',
  styleUrls: ['./tech-selector.component.sass']
})
export class TechSelectorComponent implements OnInit, OnDestroy {

  darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  collapsed: boolean = true;

  private techService: TechnologyServiceDefinition;
  technologies: Technology[] = new Array<Technology>();
  selectedTechnology: Technology;

  constructor(techServiceImpl: TechnologyService, darkThemeService: DarkThemeService, private compilerOptionsService: CompilerOptionsService) {
    this.darkTheme = darkThemeService.getDarkThemeState();
    this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
    this.techService = techServiceImpl;
   }

  async ngOnInit() {

    await this.techService.loadTechnologies().catch(() => {
      console.error("Unable to get technologies from API");
    });

    let technologiesInCache = await this.techService.getTechnologies();
    this.fillTechnologyArray(technologiesInCache);

    if(this.technologies.length > 0)
      this.compilerOptionsService.selectedTechnology = this.technologies[0];
  }

  onSelectorClick(newValue: Technology) {
    
    if(this.collapsed) {
      this.collapsed = false;
      return;
    }

    if(newValue.status == 3) { //Technology still in preview
      //this.collapsed = true;
      return;
    }

    this.selectedTechnology = newValue;
    this.collapsed = true;
    let buffer = this.technologies;
    this.technologies = new Array<Technology>();
    this.technologies.push(this.selectedTechnology); //After selection the selected technology shall be on top of the list

    for(let tech of buffer) {
      if(tech.name != this.selectedTechnology.name) {
        this.technologies.push(tech);
      }
    }
  }

  /**
   * Takes in a fresh loaded technology array from cache and places its content into
   * the array that is used by the select-box
   * @param loadedTechnologies The technologies that shall be pushed into array
   */
  private fillTechnologyArray(loadedTechnologies: Technology[]) {
    
    loadedTechnologies.sort((a, b) => {
      if(a.name < b.name)
        return -1;
      else if(a.name > b.name)
        return 1;
      else 
        return 0;
    });

    for(let techToPush of loadedTechnologies) {
      //FIRST pus all active technologies, then the ones that are in preview
      if(techToPush.status != 3)
        this.technologies.push(techToPush);
    }

    for(let techToPush of loadedTechnologies) {
      if(techToPush.status == 3)
        this.technologies.push(techToPush);
    } 
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
