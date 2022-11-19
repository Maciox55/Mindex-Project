import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';

import {Employee} from './employee';

@Injectable()
export class EmployeeService {
  private url = '/api/employees';

  constructor(private http: HttpClient) {
  }

  //Rretrns observable with a list of Emplyees form the pseudo endpoint
  getAll(): Observable<Employee> {
    return this.http.get<Employee[]>(this.url)
      .pipe(
        flatMap(emps => from(emps)),
        catchError(this.handleError)
      );
  }

  //Gets specific Employee with given id
  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  //Either updates existing Employee or inserts if ID is not found
  save(emp: Employee): Observable<Employee> {
    const response = (!!emp.id) ? this.put(emp) : this.post(emp);
    console.log(response);
    return response.pipe(catchError(this.handleError));
  }

  //Deletes a specific Employee from storage/endpoint
  remove(emp: Employee): Observable<never> {
    return this.http
      .delete<never>(`${this.url}/${emp.id}`)
      .pipe(catchError(this.handleError));
  }


  //Sends POST HTTP request to the enpoint, emp is the header data for updates
  private post(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp);
  }

   //Sends PUT HTTP request to the endpoint, emp is the header data for inserts
  private put(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${emp.id}`, emp);
  }

  //Simulates general server error
  private handleError(res: HttpErrorResponse | any): Observable<never> {
    return throwError(res.error || 'Server error');
  }
}
