import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { UserManagementService, WargaService } from '@core/http/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    private wargaService: WargaService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      nik: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log('queryParams', queryParams);
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/dashboard']);
          }
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } if (environment.defaultauth === 'api') {
        try {
          await this.wargaService.storeWarga({
            nik: this.f.nik.value ?? Math.floor(Math.random() * 10000) + '',
            email: this.f.email.value,
            nama_warga: this.f.username.value,
            nomor_telepon: '1234567890',
            warga_id: 0,
            alamat: 'Salemba'
          }).toPromise();
          await this.userManagementService.createUser({
            email: this.f.email.value,
            password: this.f.password.value,
            name: this.f.username.value,
            phone: ''
          }).toPromise();
          Swal.fire('Created!', 'Saved successfully.', 'success');
        } catch (e) {
          Swal.fire('Error', 'Alamat email Anda sudah terdaftar. Silakan masuk menggunakan alamat email tersebut.');
        }
      } else {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/account/login']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }
}
