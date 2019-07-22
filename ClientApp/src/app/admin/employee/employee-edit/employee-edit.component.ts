import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { CountrySelect } from 'src/app/_shared/intefaces/public/country-select';
import { EmployeeDetail } from 'src/app/_shared/intefaces/public/employee-detail';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/_shared/services/public/photo.service';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';
import { Employee } from 'src/app/_shared/intefaces/public/employee';
import { Photo } from 'src/app/_shared/intefaces/public/photo';
import { PhotoForEmployee } from 'src/app/_shared/intefaces/public/photo-for-employee';
import { CountryService } from 'src/app/_shared/services/public/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/_shared/services/public/department.service';
import { DepartmentSelect } from 'src/app/_shared/intefaces/public/department/department-select';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;

  // Subscriptions
  sub$ = new Subscription();

  // Variables
  countries: CountrySelect[];
  departments: DepartmentSelect[];
  employee: EmployeeDetail;

  // Form
  employeeForm: FormGroup;

  employeeId = +this.route.snapshot.params.employeeId;
  editMode: boolean;
  title: string;

  // Photo upload
  photoUploadExpansion = false;
  photoUploadUrl = `${this.baseUrl}api/photo/employee/${this.employeeId}`;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.employeeId > 0) {
      this.editMode = true;

      this.getEmployee(this.employeeId);
    } else {
      this.editMode = false;
      this.title = 'New employee';
    }
    this.getCountrySelect();
    this.getDepartmentSelect();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getCountrySelect() {
    this.countryService.getCountriesSelect().subscribe((res: CountrySelect[]) => {
      this.countries = res;
    });
  }

  getDepartmentSelect() {
    this.sub$.add(
      this.departmentService.getDepartmentsSelect().subscribe((res: DepartmentSelect[]) => {
        this.departments = res;
      })
    );
  }

  getEmployee(employeeId: number) {
    this.sub$.add(
      this.employeeService.getEmployeeDetail(employeeId).subscribe((res: EmployeeDetail) => {
        this.employee = res;

        this.title = `Edit ${res.fullName}`;
        this.updateForm(res);
      })
    );
  }

  createForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [true, [Validators.required]],
      dateOfBirth: ['', Validators.required],
      telephone: [''],
      address: [''],
      countryId: ['', Validators.required],
      departmentId: ['', Validators.required]
    });
  }

  updateForm(employee: EmployeeDetail) {
    this.employeeForm.setValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: employee.gender,
      dateOfBirth: employee.dateOfBirth,
      telephone: employee.telephone,
      address: employee.address,
      countryId: employee.countryId,
      departmentId: employee.departmentId
    });
  }

  onSubmit() {
    const employee = <Employee>{};

    employee.firstName = this.employeeForm.value.firstName;
    employee.lastName = this.employeeForm.value.lastName;
    employee.gender = this.employeeForm.value.gender;
    employee.dateOfBirth = this.employeeForm.value.dateOfBirth;
    employee.telephone = this.employeeForm.value.telephone;
    employee.address = this.employeeForm.value.address;
    employee.countryId = this.employeeForm.value.countryId;
    employee.departmentId = this.employeeForm.value.departmentId;

    if (this.editMode) {
      employee.employeeId = this.employeeId;
      this.employeeService.updateEmployee(employee).subscribe((res: Employee) => {
        if (res) {
          this.snackBar.open('Employee has been updated', 'Success');
        } else {
          this.snackBar.open(`Can't update employee, please try again`, 'Error');
        }
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe((res: Employee) => {
        if (res) {
          this.router.navigate([`/admin/employee/${res.employeeId}/edit`]);
          this.snackBar.open('Supplier has been created', 'Success');
        } else {
          this.snackBar.open(`Can't create supplier, please try again`, 'Error');
        }
      });
    }
  }

  resetForm() {
    if (this.employee) {
      this.updateForm(this.employee);
    } else {
      this.employeeForm.reset();
    }
  }

  deletePhoto(photoId: number) {
    this.sub$.add(
      this.photoService.deletePhoto(photoId).subscribe((res: Photo) => {
        if (res) {
          const index = this.employee.photos.findIndex(p => p.photoId === photoId);
          this.employee.photos.splice(index, 1);

          this.snackBar.open('Photo deleted', 'Success');
        } else {
          this.snackBar.open(`Can't delete photo, please try again`, 'Error');
        }
      })
    );
  }

  setMainPhoto(photo: PhotoForEmployee) {
    this.sub$.add(
      this.photoService.setMainPhotoForEmployee(photo).subscribe((res: PhotoForEmployee) => {
        if (res) {
          const index = this.employee.photos.findIndex(p => p.photoId === photo.photoId);

          this.employee.photos.splice(index, 1);
          this.employee.photos.unshift(res);

          this.snackBar.open('Main photo has been set', 'Success');
        } else {
          this.snackBar.open(`Can't set main photo, please try again`, 'Error');
        }
      })
    );
  }

  get(name: string): AbstractControl {
    return this.employeeForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.employeeForm.get(name);

    return control.getError('required') ? `${value} is required` : control.getError('email') ? 'Not a valid email address' : null;
  }

  refreshPhotoUpload(event: PhotoForEmployee) {
    this.employee.photos.push(event);
  }

  togglePhotoUploadExpansion() {
    this.photoUploadExpansion = !this.photoUploadExpansion;
  }
}
