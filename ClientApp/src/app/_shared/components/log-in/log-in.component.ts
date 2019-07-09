import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { AuthService } from '../../../auth/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;
  showSpinner = true;
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  createForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
  }

  login() {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    this.authService.login(username, password).subscribe(
      res => {
        if (res && res.token) {
          this.router.navigate(['home']);
          this.snackBar.open(`Welcome ${username}`, 'Success');
        }
      },
      () => {
        this.formGroup.setErrors({
          auth: 'Invalid username or password'
        });
        this.snackBar.open('Unauthorized', 'Failed');
      },
    );
  }

  getControllError(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getFormError(formGroup: FormGroup) {
    return formGroup.getError('auth');
  }
}
