import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FileSelectionDirective } from './file-selection.directive';
import { FileSelectionItemComponent } from './file-selection-item/file-selection-item.component';
import { SQLFile } from 'src/app/_models/sql-file';
import { FileCatalogService } from '../../services/file-catalog.service';
import { FileProviderService } from '../../services/file-provider.service';

@Component({
  selector: 'app-file-catalog',
  templateUrl: './file-catalog.component.html',
  styleUrls: ['./file-catalog.component.sass']
})
export class FileCatalogComponent implements OnInit {
  @ViewChild(FileSelectionDirective, { static: true }) fileSelectionHost: FileSelectionDirective;

  showPlaceholder: boolean = true;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private fileCatalogService: FileCatalogService, private fileProviderService: FileProviderService) { }

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
   * Gets all ETL files from Azure DevOps and places them in the catalog
   */
  getFilesFromAzureDevOps() {

    this.fileProviderService.getFilesFromAzureDevOps().then((files) => {

      if(files.length > 0)
        this.showPlaceholder = false;
      
      const viewContainerRef = this.fileSelectionHost.viewContainerRef;
      viewContainerRef.clear();

      for(let file of files)
        this.addItemToCatalog(file);
    }, (reason) => console.error("Unable to get files from Azure"));
  }

  /**
   * Adds a sql file to the catalog
   */
  addItemToCatalog(file: SQLFile) {

    const viewContainerRef = this.fileSelectionHost.viewContainerRef;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileSelectionItemComponent);

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FileSelectionItemComponent>componentRef.instance).sqlFile = file;

    this.fileCatalogService.selectedFileSubject.next(file);
  }
}
