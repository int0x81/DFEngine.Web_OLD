import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';

@Component({
  selector: 'app-add-repo',
  templateUrl: './add-repo.component.html',
  styleUrls: ['./add-repo.component.sass']
})
export class AddRepoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  onAddRepoButtonClick() {
    this.modalService.open(RepoModalComponent, {centered: true });
  }
}
