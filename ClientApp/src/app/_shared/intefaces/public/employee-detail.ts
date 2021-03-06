import { PhotoForEmployee } from './photo-for-employee';

export interface EmployeeDetail {
    employeeId: number;
    gender: boolean;
    firstName: string;
    lastName: string;
    fullName: string;
    dateOfBirth: Date;
    telephone: string;
    email: string;
    address: string;
    countryId: number;
    countryName: string;
    departmentId: number;
    departmentName: string;

    photos: PhotoForEmployee[];
}
