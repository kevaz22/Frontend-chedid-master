import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  motorQuotaions: any
  filteredMotor:any;
  title="pagination";
  page: number=1;
  count:number=0;
  pageSize:number = 10

  constructor(private api: ApiService,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.motorQuotationList();
    
  }
  motorQuotationList(){
    this.api.getAllMotors().subscribe(data => {
      console.log('Received Data:', data);
      this.motorQuotaions = data;
      this.filteredMotor=data
    })
  }
  motorSearch = this.fb.group({
    motor: [''],
    sort:['']
  });
  onSearch() {

    this.motorQuotaions = this.filteredMotor.filter((filtered: any) =>
      filtered.policyOwner.includes(this.motorSearch.get('motor')?.value) ||
      filtered.carMake.includes(this.motorSearch.get('motor')?.value)
    );

  }
  onSortChange(){
    if (this.motorSearch.get('sort')?.value == 'asc') {
      // Sort in ascending order based on Creation Date
      this.motorQuotaions.sort((a: { creationDate: string | number | Date; }, b: { creationDate: string | number | Date; }) => (new Date(a.creationDate) > new Date(b.creationDate)) ? 1 : -1);
    } else if (this.motorSearch.get('sort')?.value === 'desc') {
      // Sort in descending order based on Creation Date
      this.motorQuotaions.sort((a: { creationDate: string | number | Date; }, b: { creationDate: string | number | Date; }) => (new Date(b.creationDate) > new Date(a.creationDate)) ? 1 : -1);
    }
  }

  onDataChange(event:any){
    this.page=event;
    this.motorQuotationList();
  }
}
