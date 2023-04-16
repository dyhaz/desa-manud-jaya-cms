import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import { FirebaseAuthenticationService } from '@core/services/auth.service';
import { environment } from '@environments/environment';
import { AuthenticationService } from "@core/http/api";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  async onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    if (environment.defaultauth === 'firebase') {
      // this.authenticationService.resetPassword(this.f.email.value)
      //   .catch(error => {
      //     this.error = error ? error : '';
      //   });
    } else {
      try {
        await this.authenticationService.sendEmailVerificationLink({
          email: this.f.email.value
        }).toPromise();
        Swal.fire('Email sent!', 'Please check your inbox for instructions of how to reset your password', 'success');
      } catch (e) {
        Swal.fire('Error', e.toString());
      }
    }
  }
}
