import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { CountrySelect } from 'src/app/_shared/intefaces/public/country-select';
import { CountryService } from 'src/app/_shared/services/public/country.service';
import { Supplier } from 'src/app/_shared/intefaces/buy/supplier/supplier';

@Component({
  selector: 'app-supplier-edit-dialog',
  templateUrl: './supplier-edit-dialog.component.html',
  styleUrls: ['./supplier-edit-dialog.component.css']
})
export class SupplierEditDialogComponent implements OnInit, OnDestroy {
  countries: CountrySelect[];
  formGroup: FormGroup;
  editMode: boolean;
  title: string;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private countryService: CountryService,
    private dialogRef: MatDialogRef<SupplierEditDialogComponent>,
    // Inject data from supplier-list component
    @Inject(MAT_DIALOG_DATA) public dataFromList
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.dataFromList) {
      this.editMode = true;

      this.title = `Edit ${this.dataFromList.fullName}`;
      this.updateForm();
    } else {
      this.editMode = false;
      this.title = 'Create new supplier';
    }
    this.getCountrySelect();
  }

  getCountrySelect() {
    this.countryService.getCountriesSelect().subscribe((res: CountrySelect[]) => {
      this.countries = res;
    });
  }

  ngOnDestroy(): void {}

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

  updateForm() {
    this.formGroup.setValue({
      firstName: this.dataFromList.firstName,
      lastName: this.dataFromList.lastName,
      gender: this.dataFromList.gender,
      dateOfBirth: this.dataFromList.dateOfBirth,
      personNumber: this.dataFromList.personNumber,
      telephone: this.dataFromList.telephone,
      fax: this.dataFromList.fax,
      countryId: this.dataFromList.countryId
    });
  }

  // TODO: add country dialog
  // Open add category dialog
  // openDialog() {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   // Width & height
  //   dialogConfig.maxWidth = '100vw';
  //   dialogConfig.maxHeight = '100vh';
  //   dialogConfig.minWidth = '80%';
  //   dialogConfig.height = '80%';

  //   const dialogRef = this.dialog.open(
  //     CategoryBuyDialogComponent,
  //     dialogConfig,
  //   );

  //   // Get data returned from dialog
  //   dialogRef.afterClosed().subscribe((data: CategoryBuy) => {
  //     // Check if data exists
  //     if (data) {
  //       this.countryService
  //         .addCategory(data)
  //         .subscribe((res: CategoryBuy) => {
  //           // Add new category into categories
  //           this.countries.push(res);
  //           // Update formControl with new added value
  //           this.formGroup.patchValue({
  //             categoryId: res.categoryId,
  //           });
  //         });
  //     }
  //   });
  // }

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
      tempSupplier.personId = this.dataFromList.personId;
      this.supplierService.updateSupplier(tempSupplier).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.supplierService.addSupplier(tempSupplier).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : formControl.hasError('pattern')
      ? 'Please enter a number!'
      : '';
  }
}
