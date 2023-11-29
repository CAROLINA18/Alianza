import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faFile,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PopupNewClientComponent } from '../popup-new-client/popup-new-client.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  faFile = faFile;
  faArrowRight = faArrowRight
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


 openModal() {
    const modalRef = this.modalService.open(PopupNewClientComponent);
  }

}

