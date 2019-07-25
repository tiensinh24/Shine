import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../services/public/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Department } from '../../intefaces/public/department/department';

@Component({
  selector: 'app-department-edit-dialog',
  templateUrl: './department-edit-dialog.component.html',
  styleUrls: ['./department-edit-dialog.component.scss']
})
export class DepartmentEditDialogComponent implements OnInit, OnDestroy {
  // Subscription
  sub$ = new Subscription();

  // Formgroup
  departmentForm: FormGroup;

  // Variables
  title = 'New department';

  constructor(
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.parentData.edit) {
      this.title = `Edit ${this.parentData.departmentName}`;

      this.updateForm();
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  createForm() {
    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required]
    });
  }

  updateForm() {
    this.departmentForm.setValue({
      departmentName: this.parentData.departmentName
    });
  }

  onSubmit() {
    const department = <Department>{
      departmentName: this.departmentForm.value.departmentName
    };

    if (this.parentData.edit) {
      department.departmentId = this.parentData.departmentId;

      this.sub$.add(
        this.departmentService.updateDepartment(department).subscribe((res: Department) => {
          if (res) {
            this.dialogRef.close(res);
            this.snackbar.open('Department updated', 'Success');
          } else {
            this.dialogRef.close();
            this.snackbar.open(`Can't update department, please try again`, 'Error');
          }
        })
      );
    } else {
      this.sub$.add(
        this.departmentService.addDepartment(department).subscribe((res: Department) => {
          if (res) {
            this.dialogRef.close(res);
            this.snackbar.open('Department added', 'Success');
          } else {
            this.dialogRef.close();
            this.snackbar.open(`Can't add department, please try again`, 'Error');
          }
        })
      );
    }
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  get(name: string): AbstractControl {
    return this.departmentForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.departmentForm.get(name);

    return control.hasError('required') ? `${value} is required` : null;
  }
}
