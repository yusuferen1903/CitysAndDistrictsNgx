import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface CombinedData {
  il: string;
  ilce: string;
  ilce_id: string;
}
interface Il {
  id: string;
  name: string;
}

interface Ilce {
  id: string;
  il_id: string;
  name: string;
}
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent implements OnInit {
  
  ilList: Il[] = [];
  ilceList: Ilce[] = [];
  combinedList: CombinedData[] = [];
  pageSize = 10;
  offset = 0; 
  changedIlce
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<Il[]>('assets/iller.json').subscribe(ilData => {
      this.http.get<Ilce[]>('assets/ilceler.json').subscribe(ilceData => {
        this.ilList = ilData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        this.ilceList = ilceData;
        this.combineData();
      });
    });
  }
  combineData() {
    this.combinedList = [];
    for (const ilce of this.ilceList) {
      const il = this.ilList.find(item => item.id === ilce.il_id);
      if (il) {
        this.combinedList.push({ il: il.name, ilce: ilce.name, ilce_id: ilce.id });
      }
    }
  }
  updateDistrict(event, row){
    this.changedIlce = row.ilce_id
    row.ilce = event.target.value
    
  }
  updateDistrictId(event ,row){
    this.changedIlce = row.ilce_id
    row.ilce_id = event.target.value

  }
  toggleEdit(row) {
    row.editing = !row.editing;
  }

  save(row) {
    row.editing = false;
    console.log(row);
    window.alert((row.ilce + ' ' + row.ilce_id))
    
  }

  saveAll(){
    console.log(this.combinedList);
    window.alert(this.combinedList)
  }
  onIlChange(row) {
    console.log(row);
    
  }
}
