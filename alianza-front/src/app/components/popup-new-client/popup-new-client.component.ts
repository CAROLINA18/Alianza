import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-new-client',
  templateUrl: './popup-new-client.component.html',
  styleUrls: ['./popup-new-client.component.css']
})
export class PopupNewClientComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal , private api:ApiService, private router:Router) { }

  
  newForm = new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
  })

  ngOnInit(): void {
  }

  postForm(form:any){
    console.log(form)
    this.api.postData(form).subscribe(data =>{
      window.location.reload();
    })
  }
  
}

