import {Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {Employee} from '../employee';
import { EmployeeService } from '../employee.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee; //Input data passed by parent component, available for use on/after ngOnInit 

  @Output() editedEvent = new EventEmitter<Employee>();

  reports:Employee[]; //Store the Direct Report Employee elements for rendering of the DRE list components

  //Dependency Injection of the Employee Service for calling of the save function when form is submitted with changed values.
  constructor(private employeeService: EmployeeService, private modal: MatDialog) {
  }

  ngOnInit(){
    this.reports = []; 

    //On Component init, check if the Employee object contains any direct reports, if so, recursively traverse them.
    if(this.employee.directReports)
      this.traverseReports(this.employee);
    
  }

/**
 * Opens a modal in Edit mode, passing the Direct Report Employee object reference.
 * Processing of updating the employee object reference after the Edit modal was submitted.
 * Closes the modal after it is finished.
 * @param emp Employee object reference
 */
  edit(emp:Employee){
   
    const modalref = this.modal.open(ModalComponent, {width:'350px',data:{mode:"edit",employee:emp}});

    modalref.componentInstance.modalEvent.subscribe((data) =>{
      modalref.close();
      this.editedEvent.emit(data);
      
    });
  }

  /**
   * Opens a modal in Delete mode, passing the Direct Report Employee object reference.
   * Processing of updating the employee object reference after the Delete modal was submitted.
   * Removes the selected Direct Report form this Employee object.
   * Emits an event to the Parent Employee List Component for service call with the updated employee service for storage in DB
   * Closes the modal after it is finished.
   * 
   * @param emp Employee object reference
   * 
   */

  delete(emp:Employee){

    const modalref = this.modal.open(ModalComponent, {width:'350px',data:{mode:"delete",employee:emp}});

    modalref.componentInstance.modalEvent.subscribe((data) =>{
     
      modalref.close();

      const index = this.employee.directReports.findIndex(directReport => directReport === emp.id);
      this.employee.directReports.splice(index,1); //Remove from the directReports property
      this.reports.splice(index,1); //Remove from the populated list of 

      this.editedEvent.emit(this.employee);

    });
  }
  
  /**
   * Simplest Implementation of traversal, not sure if optimal way
   * Recursively traversing the indirect report 'tree', For each direct report check that employees reports, etc.
   * Unsure how deep the indirect reports should go, in this case it counts all reports until no more indirect reports exist
   * May not be the proper way of implementing this behavior, there could be some other more optimal solution.
   * 
   * @param emp the Employee object reference
   * @returns Total number of indirect reports for this employee
   * 
   * Issue: When deleting an indirect report, the total reports number of the original employee does not update.
   * 
   */

  traverseReports(emp: Employee){
    if(emp.directReports){
    
      emp.directReports.forEach(report => { 
          this.employeeService.get(report).subscribe((emp)=>{
            this.reports.push(emp); //Add direct reports to another array
            this.traverseReports(emp); //Recursively check if this direct report has any direct reports of their own
          });
       });
      }
  }

}
