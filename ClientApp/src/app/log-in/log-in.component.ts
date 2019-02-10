import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;
  showSpinner = true;
  hide: boolean = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {

    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  login() {
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    this.authService.login(username, password).subscribe(res => {
      if (res && res.token) {
        this.router.navigate(['home']);
      }
    }, error => {
      this.formGroup.setErrors({
        'Auth': 'Incorrect username or password'
      })
    }
    )
  }

  // login(): void {
  //   if (this.username === 'admin' && this.password === 'admin') {
  //     this.router.navigate(['']);
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // }

}
