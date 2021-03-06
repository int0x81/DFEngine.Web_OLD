import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { FileSelectionDirective } from './file-selection.directive';
import { FileSelectionItemComponent } from './file-selection-item/file-selection-item.component';
import { SQLFile } from 'src/app/_models/sql-file';
import { MultiFileService } from '../../services/multifile.service';
import { FileProviderService } from '../../services/file-provider.service';
import { DarkThemeService } from 'src/app/_services/implementations/darktheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-catalog',
  templateUrl: './file-catalog.component.html',
  styleUrls: ['./file-catalog.component.sass']
})
export class FileCatalogComponent implements OnInit, OnDestroy {
  @ViewChild(FileSelectionDirective, { static: true }) fileSelectionHost: FileSelectionDirective;

  showPlaceholder: boolean = true;

  public darkTheme: boolean;
  private darkThemeSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private multiFileService: MultiFileService, private fileProviderService: FileProviderService, 
    private darkThemeService: DarkThemeService) {

      this.darkTheme = darkThemeService.getDarkThemeState();
      this.darkThemeSubscription = darkThemeService.darkThemeSubject.subscribe(() => this.darkTheme = !this.darkTheme);
  }

  ngOnInit() { }


  /**
   * An event that gets fired when the user selects files 
   * from his local machine
   */
  uploadFromLocalMachine(event: any) {

    let files: FileList = event.target.files;

    if(files.length > 0)
      this.showPlaceholder = false;

    const viewContainerRef = this.fileSelectionHost.viewContainerRef;
    viewContainerRef.clear();

    for (let index = 0; index < files.length; index++) {

      let file: File = files.item(index);
      let fileContent: string;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        fileContent = fileReader.result as string;

        let sqlFile: SQLFile = new SQLFile(file.name, fileContent);

        this.addItemToCatalog(sqlFile);
      };

      fileReader.readAsText(file);
    }
  }

  /**
   * Adds a sql file to the catalog
   */
  addItemToCatalog(file: SQLFile) {

    const viewContainerRef = this.fileSelectionHost.viewContainerRef;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileSelectionItemComponent);

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FileSelectionItemComponent>componentRef.instance).sqlFile = file;

    this.multiFileService.selectedFileSubject.next(file);
  }

  ngOnDestroy() {
    this.darkThemeSubscription.unsubscribe();
  }
}
