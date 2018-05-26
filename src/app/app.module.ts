import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EmpDataComponent } from './emp-data/emp-data.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
import {DataTableModule} from "angular2-datatable";
import { DatatableComponent } from './datatable/datatable.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: "add_emp", component: AddEmpComponent },
  { path: "manage_emp", component: EmpDataComponent },
  { path: "manage_emp2", component: DatatableComponent},
  { path: "**", component: EmpDataComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmpDataComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddEmpComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,CommonModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true })
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
