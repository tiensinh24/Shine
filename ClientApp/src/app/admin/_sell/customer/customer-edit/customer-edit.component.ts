import { Component, OnInit, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { Subscription } from "rxjs";
import { CountrySelect } from "src/app/_shared/intefaces/public/country-select";
import { CustomerDetail } from "src/app/_shared/intefaces/sell/customer/customer-detail";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PhotoService } from "src/app/_shared/services/public/photo.service";
import { CustomerService } from "src/app/_shared/services/sell/customer.service";
import { CountryService } from "src/app/_shared/services/public/country.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Customer } from "src/app/_shared/intefaces/sell/customer/customer";
import { Photo } from "src/app/_shared/intefaces/public/photo";
import { PhotoForPerson } from "src/app/_shared/intefaces/public/photo-for-person";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.scss"]
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;

  // Subscriptions
  sub$ = new Subscription();

  // Variables
  countries: CountrySelect[];
  customer: CustomerDetail;

  // Form
  customerForm: FormGroup;

  customerId = +this.route.snapshot.params.customerId;
  editMode: boolean;
  title: string;

  // Photo upload
  photoUploadExpansion = false;
  photoUploadUrl = `${this.baseUrl}api/photo/person/${this.customerId}`;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private customerService: CustomerService,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.customerId > 0) {
      this.editMode = true;

      this.getCustomer(this.customerId);
    } else {
      this.editMode = false;
      this.title = "New customer";
    }
    this.getCountrySelect();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getCountrySelect() {
    this.countryService
      .getCountriesSelect()
      .subscribe((res: CountrySelect[]) => {
        this.countries = res;
      });
  }

  getCustomer(customerId: number) {
    this.sub$.add(
      this.customerService
        .getCustomer(customerId)
        .subscribe((res: CustomerDetail) => {
          this.customer = res;

          this.title = `Edit ${res.fullName}`;
          this.updateForm(res);
        })
    );
  }

  createForm() {
    this.customerForm = this.fb.group({
      personNumber: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [true, [Validators.required]],
      dateOfBirth: ["", Validators.required],
      telephone: [],
      fax: [],
      email: [""],
      address: [""],
      countryId: ["", Validators.required]
    });
  }

  updateForm(customer: CustomerDetail) {
    this.customerForm.setValue({
      personNumber: customer.personNumber,
      firstName: customer.firstName,
      lastName: customer.lastName,
      gender: customer.gender,
      dateOfBirth: customer.dateOfBirth,
      telephone: customer.telephone,
      fax: customer.fax,
      email: customer.email,
      address: customer.address,
      countryId: customer.countryId
    });
  }

  onSubmit() {
    const customer = <Customer>{
      personNumber: this.customerForm.value.personNumber,
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      gender: this.customerForm.value.gender,
      dateOfBirth: this.customerForm.value.dateOfBirth,
      telephone: this.customerForm.value.telephone,
      fax: this.customerForm.value.fax,
      email: this.customerForm.value.email,
      address: this.customerForm.value.address,
      countryId: this.customerForm.value.countryId
    };

    if (this.editMode) {
      customer.personId = this.customerId;
      this.customerService
        .updateCustomer(customer)
        .subscribe((res: Customer) => {
          if (res) {
            this.snackBar.open("Customer has been updated", "Success");
          } else {
            this.snackBar.open(
              `Can't update customer, please try again`,
              "Error"
            );
          }
        });
    } else {
      this.customerService.addCustomer(customer).subscribe((res: Customer) => {
        if (res) {
          this.router.navigate([`/admin/sell/customer/${res.personId}/edit`]);
          this.snackBar.open("Customer has been created", "Success");
        } else {
          this.snackBar.open(
            `Can't create customer, please try again`,
            "Error"
          );
        }
      });
    }
  }

  resetForm() {
    if (this.customer) {
      this.updateForm(this.customer);
    } else {
      this.customerForm.reset();
    }
  }

  deletePhoto(photoId: number) {
    this.sub$.add(
      this.photoService.deletePhoto(photoId).subscribe((res: Photo) => {
        if (res) {
          const index = this.customer.photos.findIndex(
            p => p.photoId === photoId
          );
          this.customer.photos.splice(index, 1);

          this.snackBar.open("Photo deleted", "Success");
        } else {
          this.snackBar.open(`Can't delete photo, please try again`, "Error");
        }
      })
    );
  }

  setMainPhoto(photo: PhotoForPerson) {
    this.sub$.add(
      this.photoService
        .setMainPhotoForPerson(photo)
        .subscribe((res: PhotoForPerson) => {
          if (res) {
            const index = this.customer.photos.findIndex(
              p => p.photoId === photo.photoId
            );

            this.customer.photos.splice(index, 1);
            this.customer.photos.unshift(res);

            this.snackBar.open("Main photo has been set", "Success");
          } else {
            this.snackBar.open(
              `Can't set main photo, please try again`,
              "Error"
            );
          }
        })
    );
  }

  get(name: string): AbstractControl {
    return this.customerForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.customerForm.get(name);

    return control.getError("required")
      ? `${value} is required`
      : control.getError("email")
      ? "Not a valid email address"
      : null;
  }

  refreshPhotoUpload(event: PhotoForPerson) {
    this.customer.photos.push(event);
  }

  togglePhotoUploadExpansion() {
    this.photoUploadExpansion = !this.photoUploadExpansion;
  }
}
