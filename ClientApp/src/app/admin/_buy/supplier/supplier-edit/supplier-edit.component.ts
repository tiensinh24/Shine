import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { CountrySelect } from 'src/app/_shared/intefaces/public/country-select';
import { CountryService } from 'src/app/_shared/services/public/country.service';
import { Supplier } from 'src/app/_shared/intefaces/buy/supplier/supplier';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierDetail } from 'src/app/_shared/intefaces/buy/supplier/supplier-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoService } from 'src/app/_shared/services/public/photo.service';
import { Photo } from 'src/app/_shared/intefaces/public/photo';
import { PhotoForPerson } from 'src/app/_shared/intefaces/public/photo-for-person';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;

  // Subscriptions
  countries$ = new Subscription();
  supplier$ = new Subscription();
  photo$ = new Subscription();

  // Variables
  countries: CountrySelect[];
  supplier: SupplierDetail;

  // Form
  formGroup: FormGroup;

  supplierId = +this.route.snapshot.params.supplierId;
  editMode: boolean;
  title: string;

  // Photo upload
  photoUploadExpansion = false;
  photoUploadUrl = `${this.baseUrl}api/photo/person/${this.supplierId}`;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private supplierService: SupplierService,
    private countryService: CountryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.supplierId > 0) {
      this.editMode = true;

      this.getSupplier(this.supplierId);
    } else {
      this.editMode = false;
      this.title = 'New supplier';
    }
    this.getCountrySelect();
  }

  ngOnDestroy(): void {
    this.countries$.unsubscribe();
    this.supplier$.unsubscribe();
    this.photo$.unsubscribe();
  }

  getCountrySelect() {
    this.countryService.getCountriesSelect().subscribe((res: CountrySelect[]) => {
      this.countries = res;
    });
  }

  getSupplier(supplierId: number) {
    this.supplier$ = this.supplierService.getSupplier(supplierId).subscribe((res: SupplierDetail) => {
      this.supplier = res;

      this.title = `Edit ${res.fullName}`;
      this.updateForm(res);
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [true, [Validators.required]],
      dateOfBirth: ['', Validators.required],
      personNumber: [],
      telephone: [],
      fax: [],
      countryId: ['', Validators.required]
    });
  }

  updateForm(supplier: SupplierDetail) {
    this.formGroup.setValue({
      firstName: supplier.firstName,
      lastName: supplier.lastName,
      gender: supplier.gender,
      dateOfBirth: supplier.dateOfBirth,
      personNumber: supplier.personNumber,
      telephone: supplier.telephone,
      fax: supplier.fax,
      countryId: supplier.countryId
    });
  }

  onSubmit() {
    const tempSupplier = <Supplier>{};

    tempSupplier.firstName = this.formGroup.value.firstName;
    tempSupplier.lastName = this.formGroup.value.lastName;
    tempSupplier.gender = this.formGroup.value.gender;
    tempSupplier.dateOfBirth = this.formGroup.value.dateOfBirth;
    tempSupplier.personNumber = this.formGroup.value.personNumber;
    tempSupplier.telephone = this.formGroup.value.telephone;
    tempSupplier.fax = this.formGroup.value.fax;
    tempSupplier.countryId = this.formGroup.value.countryId;

    if (this.editMode) {
      tempSupplier.personId = this.supplierId;
      this.supplierService.updateSupplier(tempSupplier).subscribe((res: Supplier) => {
        if (res) {
          this.snackBar.open('Supplier has been updated', 'Success');
        } else {
          this.snackBar.open(`Can't update supplier, please try again`, 'Error');
        }
      });
    } else {
      this.supplierService.addSupplier(tempSupplier).subscribe((res: Supplier) => {
        if (res) {
          this.router.navigate(['/admin/supplier/edit', res.personId]);
          this.snackBar.open('Supplier has been created', 'Success');
        } else {
          this.snackBar.open(`Can't create supplier, please try again`, 'Error');
        }
      });
    }
  }

  onCancel() {
    this.updateForm(this.supplier);
  }

  deletePhoto(photoId: number) {
    this.photo$ = this.photoService.deletePhoto(photoId).subscribe((res: Photo) => {
      if (res) {
        const index = this.supplier.photos.findIndex(p => p.photoId === photoId);
        this.supplier.photos.splice(index, 1);

        this.snackBar.open('Photo deleted', 'Success');
      } else {
        this.snackBar.open(`Can't delete photo, please try again`, 'Error');
      }
    });
  }

  setMainPhoto(photo: PhotoForPerson) {
    this.photo$ = this.photoService.setMainPhotoForPerson(photo).subscribe((res: PhotoForPerson) => {
      if (res) {
        const index = this.supplier.photos.findIndex(p => p.photoId === photo.photoId);

        this.supplier.photos.splice(index, 1);
        this.supplier.photos.unshift(res);

        this.snackBar.open('Main photo has been set', 'Success');
      } else {
        this.snackBar.open(`Can't set main photo, please try again`, 'Error');
      }
    });
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'You must enter a value' : formControl.hasError('email') ? 'Not a valid email' : formControl.hasError('pattern') ? 'Please enter a number!' : '';
  }

  refreshPhotoUpload(event: Photo) {
    this.supplier.photos.push(event);
  }

  togglePhotoUploadExpansion() {
    this.photoUploadExpansion = !this.photoUploadExpansion;
  }
}
