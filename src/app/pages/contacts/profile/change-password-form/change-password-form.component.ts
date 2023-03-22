import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { UserManagementService } from '@core/http/api';
import { UserService } from '@pages/master/user/user.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: [],
  providers: [UserService, DecimalPipe]
})

export class ChangePasswordFormComponent implements OnInit {
  @Input('modal') modal: any;
  public currentPassword = '';
  public newPassword = '';
  public confirmPassword = '';

  constructor(
    private userManagementService: UserManagementService
  ) {
  }


  ngOnInit(): void {
  }


  async save() {
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        await this.userManagementService.changePassword({
          current_password: this.currentPassword,
          new_password: this.newPassword,
          new_password_confirmation: this.confirmPassword,
          id: JSON.parse(currentUser).id
        }).toPromise();
        Swal.fire('Created!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      }
    } catch (e) {
      let errorMessage = '';

      if (this.newPassword !== this.confirmPassword) {
        errorMessage = 'Password tidak sama';
      }

      await Swal.fire('Error', errorMessage ? errorMessage : e.toString());
    }
  }

}
