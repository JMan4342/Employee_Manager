export class Employee {
    EmpId: number = 0;
    FirstName: string = '';
    LastName: string = '';
    FullName: string = '';
    AccessLevel: number = 0;
    Manager: string | undefined = undefined;
    Position: string | undefined = undefined;
    Title: string | undefined = undefined;
    Archived: boolean = false;
    StartDate!: Date;
    Department: string | undefined = undefined;

    constructor() {
    }
}
