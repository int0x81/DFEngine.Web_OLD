import { Component, OnInit, Input } from '@angular/core';
import { SQLFile } from 'src/app/_models/sql-file';
import { MultiFileService } from 'src/app/multifile-page/services/multifile.service';

@Component({
  selector: 'app-file-selection-item',
  templateUrl: './file-selection-item.component.html',
  styleUrls: ['./file-selection-item.component.sass']
})
export class FileSelectionItemComponent {
  @Input() sqlFile: SQLFile;

  selected: boolean = true;

  constructor(private fileCatalogService: MultiFileService) { }

  onCheckBoxChange() {
    this.selected = !this.selected;
    this.fileCatalogService.selectedFileSubject.next(this.sqlFile);
  }
}
