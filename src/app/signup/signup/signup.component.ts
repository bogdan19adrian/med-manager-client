import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {SignupService} from '../http-service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  role = new FormControl('', [Validators.required]);
  @ViewChild('matForm')
  private matForm;
  private roles: any;
  private selectedRole: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private signupService: SignupService) {
  }

  get f() {
    return this.signUpForm.controls;
  }

  ngOnInit() {
    this.signupService.getAllRoles().subscribe(
      data => {
        this.roles = data;
      }
    );
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      retypepassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    const json = {
      username: this.f.username.value,
      password: this.f.password.value,
      firstName: this.f.firstname.value,
      lastName: this.f.lastname.value,
      email: this.f.email.value,
      roleId: this.matForm.value.id
    };
    this.signupService.signup(json)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
