import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({selector: 'app-employee-list', template: ''})
class EmployeeListComponent {
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmployeeListComponent
      ],
      //Import all necessart modules for Material
      imports:[
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        //Added
        ReactiveFormsModule,
        MatDividerModule,
        MatDialogModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));
});
