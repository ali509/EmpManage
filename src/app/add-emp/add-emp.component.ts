import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {
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

  addEmployee(newName: string, email: string, age:number){
    var obj = {
      "name":newName,
      "email":email,
      "age":age
    }; 
    this.employeeRef.push(obj);
  }
}