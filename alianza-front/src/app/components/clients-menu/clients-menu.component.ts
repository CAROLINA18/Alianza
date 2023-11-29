import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-clients-menu',
  templateUrl: './clients-menu.component.html',
  styleUrls: ['./clients-menu.component.css']
})
export class ClientsMenuComponent implements OnInit {
  faUser=faUser;
  constructor() { }

  ngOnInit(): void {
  }

}
