import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.sass']
})
export class InfoButtonComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  openInfoModal() {
    this.modalService.open(InfoModalComponent);
  }
}