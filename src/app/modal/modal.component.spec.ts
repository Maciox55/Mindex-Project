import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  //Mock Employee data 
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
      imports:[MatSnackBarModule,MatDialogModule],
      declarations: [ ModalComponent],
      providers:[
        //Passing constructor data, in this case 
        { provide: MAT_DIALOG_DATA, useValue:{employee:emp} },
        { provide: MatDialogRef, useValue: {} }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate compensation input is a number',()=>{
    component.mode = 'edit';

    /**
     * Edge Case testing for the form.
     */
    component.employeeFormGroup.controls.compensation.setValue("ABC");

    expect(component.employeeFormGroup.valid).toBe(false);

    component.employeeFormGroup.controls.compensation.setValue(123);
    expect(component.employeeFormGroup.valid).toBe(true);

    component.employeeFormGroup.controls.compensation.setValue(0);
    expect(component.employeeFormGroup.valid).toBe(true);

    component.employeeFormGroup.controls.compensation.setValue(-1);
    expect(component.employeeFormGroup.valid).toBe(false);

    component.employeeFormGroup.controls.compensation.setValue("123");
    expect(component.employeeFormGroup.valid).toBe(true);

    component.employeeFormGroup.controls.compensation.setValue("123ABC");
    expect(component.employeeFormGroup.valid).toBe(false);

    component.employeeFormGroup.controls.compensation.setValue("@$2");
    expect(component.employeeFormGroup.valid).toBe(false);

    component.employeeFormGroup.controls.compensation.setValue("-10");
    expect(component.employeeFormGroup.valid).toBe(false);

    component.employeeFormGroup.controls.compensation.setValue("0");
    expect(component.employeeFormGroup.valid).toBe(false);
    
  });

 
});
