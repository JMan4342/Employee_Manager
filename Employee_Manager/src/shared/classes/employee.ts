export class Employee {
    EmpId: number | null = null;
    FirstName: string | undefined = undefined;
    LastName: string | undefined = undefined;
    FullName: string | undefined = undefined;
    AccessLevel: number | null = null;
    Manager: string | undefined = undefined;
    Position: string | undefined = undefined;
    Title: string | undefined = undefined;
    Archived: boolean = false;
    StartDate: Date | undefined = undefined;

    constructor() {
    }
}
