import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ApiService } from 'src/app/service/api.service';

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
  
  flag = true;
  constructor(private apiservice:ApiService) { }

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

   filterList() {
    console.log(this.data)
    this.searchTerm$.subscribe(term => {
      
        this.listFiltered = this.data.filter(item => item.sharedKey.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    
     
   });
  }

}
