import {async, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../employee.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeListComponent', () => {
  let fixture;
  let component;

  let emp = {
    id:1,
    firstName:'Maciej',
    lastName: 'Bregisz',
    position: 'Associate Softwre Engineer',
    compensation:undefined,
    directReports:undefined
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatSnackBarModule],
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ],
    }).compileComponents();
  }));




  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employees.push(emp);
    expect(comp).toBeTruthy();
  }));
});
