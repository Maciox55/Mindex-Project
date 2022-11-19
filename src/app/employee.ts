export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  compensation: number; // *Task 1*
  directReports?: Array<number>;
  totalReports?:number;

 
}
