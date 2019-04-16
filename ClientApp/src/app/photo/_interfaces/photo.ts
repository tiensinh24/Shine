export interface Photo {
  photoId: number;
  publicId: number;
  photoUrl: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;

  status: string;
  message: string;
}
