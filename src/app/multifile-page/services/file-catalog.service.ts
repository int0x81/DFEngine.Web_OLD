import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SQLFile } from 'src/app/_models/sql-file';
import { RenderingAreaService } from 'src/app/rendering-area/services/rendering-area.service';
import { CompilerService } from 'src/app/_services/implementations/compiler.service';
import { CompilerRequest } from 'src/app/_models/compilerRequest';
import { CompilerOptionsService } from 'src/app/_services/implementations/compileroptions.service';
import { DataSource } from 'src/app/_models/dataSource';
import { Landscape } from 'src/app/_models/landscape';

@Injectable()
export class FileCatalogService {

    /**
     * A map of all currently selected files. Key is the filename, value
     * is the file content
     */
    private selectedFiles: Map<string, string> = new Map<string, string>();

    // When a user types into the textarea, the thread should not
    // fire an update event all the time. This value is the amount
    // of time in milliseconds how long the thread will wait 
    // with the update call to trigger trigger
    private readonly UPDATE_TRESHHOLD: number = 1100;

    private lastChange: number = null; //milliseconds
    private isSelecting: boolean = false;

    /**
     * This subject gets fed whenever a user selects or deselects a file
     */
    selectedFileSubject: Subject<SQLFile> = new Subject<SQLFile>();

    constructor(renderingService: RenderingAreaService, compilerService: CompilerService, compilerOptionsService: CompilerOptionsService) {

        this.selectedFileSubject.subscribe(async (file) => {

            if(this.selectedFiles.has(file.name))
              this.selectedFiles.delete(file.name);
            else
              this.selectedFiles.set(file.name, file.content);

              this.lastChange = new Date().getSeconds() * 1000 + new Date().getMilliseconds();

              if(this.isSelecting)
                return;
              else {
      
                this.isSelecting = true;
      
                while((new Date().getSeconds() * 1000 + new Date().getMilliseconds()) - this.UPDATE_TRESHHOLD < this.lastChange % 60000) {
                  await (new Promise((resolve) => {
                    setTimeout(resolve, 200);
                  }));
                };
      
                if(this.selectedFiles == null || this.selectedFiles.size == 0)
                  renderingService.clearGRESubject.next();
                else {
                    
                    renderingService.loadingStateSubject.next();
                    
                    let request: CompilerRequest = {
                        technologyId: compilerOptionsService.selectedTechnology.id,
                        columnLevel: compilerOptionsService.compileColumnLevel,
                        dataSources: new Array<DataSource>()
                    };

                    this.selectedFiles.forEach((value, key) => {
                        request.dataSources.push(
                            {
                                name: key,
                                content: value
                            });
                    });
                    console.log("Calling API");
                    await compilerService.compile(request).then((landscape) => {
                      console.log("API responded");
                      renderingService.renderLandscapeSubject.next(landscape);
                    }, () => console.error("Unable to get result from API"));
                    
                }
            
                this.isSelecting = false;
            }
        });  
    }

    getSelectedFiles(): SQLFile[] {

        let files = new Array<SQLFile>();

        this.selectedFiles.forEach((value, key) => {
            files.push(new SQLFile(key, value));
        });

        return files;
    }
}