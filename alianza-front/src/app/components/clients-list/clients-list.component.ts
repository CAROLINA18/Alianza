import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/internal/Subject';
import { ApiService } from 'src/app/service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupNewClientComponent } from '../popup-new-client/popup-new-client.component';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  data:any[] = [];
  listFiltered : any[] = [];
  sharedKey:string = ''
  searchTerm$ = new Subject<string>();
  formSearch = new FormGroup({
    name:new FormControl('' ,  Validators.required),
    email:new FormControl(''),
    phone:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),
  })
  faFile = faFile;
  faArrowRight = faArrowRight
  searchCriteria: any = { name: '',email: '' ,phone: '',startDate: '',endDate: '' };
  headers: string[] = ['Id','ShredKey', 'Phone', 'email' , 'Start Date' , 'end Date' , 'name'];
  flag = true;
  constructor(private apiservice:ApiService , private modalService: NgbModal) { }

  ngOnInit(): void {
    this.allData();
    this.listFiltered = this.data;
    this.filterList();
    this.searchAdvance();
  }

  allData(){
    this.apiservice.getData().subscribe(data =>{
      this.data=data;
      this.listFiltered = data
      console.log(this.listFiltered)
    })
  }

  searchAdvance(){
    if(this.flag === true){
     this.flag = false
    }else if(this.flag === false){
     this.flag = true
    }
    return this.flag = this.flag   
   }

   searchFields(form:any){
    this.listFiltered = this.data.filter(data => {
      return (
        data.name.toLowerCase().includes(this.searchCriteria.name.toLowerCase()) &&
        data.email.toLowerCase().includes(this.searchCriteria.email.toLowerCase()) &&
        data.phone.includes(this.searchCriteria.phone) &&
        (this.searchCriteria.startDate === '' || new Date(data.startDate).toISOString().includes(this.searchCriteria.startDate)) &&
        (this.searchCriteria.endDate === '' || new Date(data.endDate).toISOString().includes(this.searchCriteria.endDate))
      );
    });

}
   filterList() {
    this.searchTerm$.subscribe(term => {
        this.listFiltered = this.data.filter(item => item.sharedKey.toLowerCase().indexOf(term.toLowerCase()) >= 0);
   });
  }

  openModal() {
    const modalRef = this.modalService.open(PopupNewClientComponent);
  }

  private convertToCSV(objArray: any[]): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    str += this.headers.join(',') + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') {
          line += ',';
        }
        line += array[i][index];
      }
      str += line + '\r\n';
    }

    return str;
  }

  exportToCSV() {
    const csvContent = this.convertToCSV(this.listFiltered);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'usuarios.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
