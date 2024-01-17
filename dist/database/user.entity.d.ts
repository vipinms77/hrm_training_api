export declare class User {
    id: number;
    username: string;
    password: string;
    validatePassword(password: string): Promise<boolean>;
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    designation: string;
    dateOfJoining: string;
    address: string;
    moreDetails: string;
}
