import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-emp-data',
  templateUrl: './emp-data.component.html',
  styleUrls: ['./emp-data.component.css']
})
export class EmpDataComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  employeeRef: AngularFireList<any>;
  employees: Observable<any[]>;
  emp; emp1;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('demo');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });  

  
  this.employeeRef = db.list('employee');
  this.employees = this.employeeRef.snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
}

addItem(newName: string) {
  this.itemsRef.push({ text: newName });
}
updateItem(key: string, newText: string) {
  this.itemsRef.update(key, { text: newText });
}
deleteItem(key: string) {    
  this.itemsRef.remove(key); 
}
deleteEverything() {
  this.itemsRef.remove();
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
updateEmployee(key: string, newText: string){
  this.employeeRef.update(key, {text: newText });
}
deleteEmployee(key: string){
  this.employeeRef.remove(key);
}

getEmployeeById(id) {
  this.emp1 = this.employees.filter(function(e) {
    //return e.key == id;
    console.log(e);
    return this.emp1;
  })
}
getEmployeeByIdi(id) {
   this.emp = this.employees.filter(e =>id);
  console.log(this.emp);
  return this.emp;
  }
}