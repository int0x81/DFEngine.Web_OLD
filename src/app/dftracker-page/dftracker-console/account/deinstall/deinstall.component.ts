import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeinstallModalComponent } from './deinstall-modal/deinstall-modal.component';

@Component({
  selector: 'app-deinstall',
  templateUrl: './deinstall.component.html',
  styleUrls: ['./deinstall.component.sass']
})
export class DeinstallComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openDeinstallModal() {
    this.modalService.open(DeinstallModalComponent, {centered: true });
  }
}
