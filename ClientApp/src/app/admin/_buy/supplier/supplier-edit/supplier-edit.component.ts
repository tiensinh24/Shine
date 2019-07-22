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
  sub$ = new Subscription();

  // Variables
  countries: CountrySelect[];
  supplier: SupplierDetail;

  // Form
  supplierForm: FormGroup;

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
    this.sub$.unsubscribe();
  }

  getCountrySelect() {
    this.countryService.getCountriesSelect().subscribe((res: CountrySelect[]) => {
      this.countries = res;
    });
  }

  getSupplier(supplierId: number) {
    this.sub$.add(
      this.supplierService.getSupplier(supplierId).subscribe((res: SupplierDetail) => {
        this.supplier = res;

        this.title = `Edit ${res.fullName}`;
        this.updateForm(res);
      })
    );
  }

  createForm() {
    this.supplierForm = this.fb.group({
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
    this.supplierForm.setValue({
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
    const supplier = <Supplier>{};

    supplier.firstName = this.supplierForm.value.firstName;
    supplier.lastName = this.supplierForm.value.lastName;
    supplier.gender = this.supplierForm.value.gender;
    supplier.dateOfBirth = this.supplierForm.value.dateOfBirth;
    supplier.personNumber = this.supplierForm.value.personNumber;
    supplier.telephone = this.supplierForm.value.telephone;
    supplier.fax = this.supplierForm.value.fax;
    supplier.countryId = this.supplierForm.value.countryId;

    if (this.editMode) {
      supplier.personId = this.supplierId;
      this.supplierService.updateSupplier(supplier).subscribe((res: Supplier) => {
        if (res) {
          this.snackBar.open('Supplier has been updated', 'Success');
        } else {
          this.snackBar.open(`Can't update supplier, please try again`, 'Error');
        }
      });
    } else {
      this.supplierService.addSupplier(supplier).subscribe((res: Supplier) => {
        if (res) {
          this.router.navigate([`/admin/supplier/${res.personId}/edit`]);
          this.snackBar.open('Supplier has been created', 'Success');
        } else {
          this.snackBar.open(`Can't create supplier, please try again`, 'Error');
        }
      });
    }
  }

  resetForm() {
    if (this.supplier) {
      this.updateForm(this.supplier);
    } else {
      this.supplierForm.reset();
    }
  }

  deletePhoto(photoId: number) {
    this.sub$.add(
      this.photoService.deletePhoto(photoId).subscribe((res: Photo) => {
        if (res) {
          const index = this.supplier.photos.findIndex(p => p.photoId === photoId);
          this.supplier.photos.splice(index, 1);

          this.snackBar.open('Photo deleted', 'Success');
        } else {
          this.snackBar.open(`Can't delete photo, please try again`, 'Error');
        }
      })
    );
  }

  setMainPhoto(photo: PhotoForPerson) {
    this.sub$.add(
      this.photoService.setMainPhotoForPerson(photo).subscribe((res: PhotoForPerson) => {
        if (res) {
          const index = this.supplier.photos.findIndex(p => p.photoId === photo.photoId);

          this.supplier.photos.splice(index, 1);
          this.supplier.photos.unshift(res);

          this.snackBar.open('Main photo has been set', 'Success');
        } else {
          this.snackBar.open(`Can't set main photo, please try again`, 'Error');
        }
      })
    );
  }

  get(name: string): AbstractControl {
    return this.supplierForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.supplierForm.get(name);

    return control.getError('required') ? `${value} is required` : control.getError('email') ? 'Not a valid email address' : null;
  }

  refreshPhotoUpload(event: Photo) {
    this.supplier.photos.push(event);
  }

  togglePhotoUploadExpansion() {
    this.photoUploadExpansion = !this.photoUploadExpansion;
  }
}
