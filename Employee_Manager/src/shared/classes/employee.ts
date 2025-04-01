export class Employee {
    Id: number | null = null;
    FirstName: string | undefined = undefined;
    LastName: string | undefined = undefined;
    AccessLevel: number | null = null;
    Manager: string | undefined = undefined;
    Position: string | undefined = undefined;
    Archived: boolean = false;
    StartDate: Date | undefined = undefined;

    constructor() {
    }
}
