export interface SupplierList {
  personId: number;
  personNumber: string;
  gender: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: Date;
  telephone: string;
  fax: string;
  countryId: number;

  countryName: string;
  continentName: string;

  PhotosUrl: string[];
}
