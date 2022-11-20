import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

/**
 * When 'deleting' a Direct Report employee, the Employee object only gets updated with the new array of Direct Reports
 * Therefore both 'edit' and 'delete' functionalities can share the same Save function.
 * @param event - contains the Employee which was edited
 * 
 * Issue: Updated Employee objects do not rerender
 * 
 */
  handleEvent(event:Employee,type:string){
    
    if(type === 'delete')
    {
      this.deleteEvent(event);
    }
    else if(type === 'edit')
    {
      this.employeeService.save(event).subscribe((data)=>{
        const index = this.employees.findIndex((emp)=>{emp.id == data.id})
        this.employees[index] = data;
      },(err)=>{
        this.snackbar.open('Error Saving Data, '+ err.message, 'Dismiss', {duration:3000});
      },()=>{
        this.snackbar.open('Edit Saved Sucessfully', 'Dismiss', {duration:3000});
      });
    }    
  }

 /**
  * Implemented but not currently used, an example of Employee List Component being able to delete an Employee.
  * Rather than the above Edit event handle. 
  * This calls the Employee service remove method and subscribes to any sort of d
  * @param event  contains the Employee which was edited
  */
  deleteEvent(emp:Employee)
  {
    this.employeeService.remove(emp).subscribe((data)=>{
      const index = this.employees.findIndex(employee => employee.id === emp.id);
      this.employees.splice(index,1); //Remove from the directReports property
    },(err)=>{
      this.snackbar.open('Error Deleting Employee, '+ err.message, 'Dismiss', {duration:3000});
    },()=>{
      this.snackbar.open('Employee Deleted', 'Dismiss', {duration:3000});
    });
  }

}
