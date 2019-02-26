export interface SupplierDto {
    personId: number;
    personNumber: string;
    gender: boolean;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    telephone: string;
    fax: string;
    countryId: number;

    countryName: string;
    continentName: string;
}
