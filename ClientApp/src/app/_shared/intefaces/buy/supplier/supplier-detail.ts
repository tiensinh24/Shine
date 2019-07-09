import { PhotoForPerson } from 'src/app/_shared/intefaces/public/photo-for-person';

export interface SupplierDetail {
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
  rating: number;

  countryName: string;
  continentName: string;

  photos: PhotoForPerson[];
}
