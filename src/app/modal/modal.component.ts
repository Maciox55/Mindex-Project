import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Employee } from '../employee';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() mode:string;
  @Input() emp:Employee;
  public formGroup:FormGroup;

  @Output() modalEvent = new EventEmitter();

  employeeFormGroup: FormGroup;

  // Making sure modal has a specific mode and data reference for the FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: {mode: string, employee:Employee},private dialogRef: MatDialogRef<ModalComponent>) {
    this.mode = data.mode;
    this.emp = data.employee;

     /**
      *  Create a Reactive Form Group with Form Controls for each of the Employee Component.
      *  Default value of each form control is the data supplied when form is filled
      */
    this.employeeFormGroup = new FormGroup({
      firstName: new FormControl(this.emp.firstName),
      lastName: new FormControl(this.emp.lastName),
      position: new FormControl(this.emp.position),
      compensation: new FormControl(this.emp.compensation,[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.min(0)])
    });
   }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  };

  /**
   * Handles either the edit form or deletion confirmation depending on the current modal mode.
   * Edit mode modifies the properties of the object before being send back the obejct reference in an emitted event for later handling.
   * 
   */
  submit(){

    if(this.mode === 'edit')
    {
      if(this.employeeFormGroup.valid)
      {
        //change the properties of emp and send it back as the new Employee object
        this.emp.firstName = this.employeeFormGroup.value.firstName;
        this.emp.lastName = this.employeeFormGroup.value.lastName;
        this.emp.position = this.employeeFormGroup.value.position;
        this.emp.compensation = this.employeeFormGroup.value.compensation;
        this.modalEvent.emit(this.emp);

      }

    } else if(this.mode === 'delete')
    {
      this.modalEvent.emit(this.emp);
    }

  };
}
