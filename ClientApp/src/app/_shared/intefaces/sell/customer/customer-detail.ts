import { PhotoForPerson } from "../../public/photo-for-person";

export interface CustomerDetail {
  personId: number;
  personNumber: string;
  gender: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: Date;
  telephone: string;
  fax: string;
  email: string;
  address: string;
  countryId: number;
  rating: number;

  countryName: string;
  continentName: string;

  photos: PhotoForPerson[];
}
