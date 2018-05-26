import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-2-data-table';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { 
   OnChanges, Input, 
  trigger, state, animate, transition, style 
} from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown' , style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class DatatableComponent implements OnInit {
  @Input() isVisible : boolean = false;
  visibility = 'shown';

  ngOnChanges() {
     this.visibility = this.isVisible ? 'shown' : 'hidden';
  }
  employeeRef: AngularFireList<any>;
  employees: Observable<any[]>;

  constructor(db: AngularFireDatabase) {  
  this.employeeRef = db.list('employee');
  this.employees = this.employeeRef.snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
}
ngOnInit() {
}
  @ViewChild(DataTable) filmsTable;
  addEmployee(newName: string, email: string, age:number){
    var obj = {
      "name":newName,
      "email":email,
      "age":age
    }; 
    this.employeeRef.push(obj);
  }
  updateEmployee(key: string, newText: string){
    this.employeeRef.update(key, {text: newText });
  }
  deleteEmployee(key: string){
    this.employeeRef.remove(key);
  }
  
  Data = [
    {name: 'vin', email: 'Vin', age: '21'},
    {name: 'year', email: 'Year', age: '21'},
    {name: 'brand', email: 'Brand', age: '21'},
    {name: 'color', email: 'Color', age: '21'}
];

}



