import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from '@pages/master/user/user.model';
import Swal from 'sweetalert2';
import { UserManagementService } from '@core/http/api';
import { UserService } from '@pages/master/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [],
  providers: [UserService, DecimalPipe]
})

export class UserFormComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('mode') mode: 'edit'|'add' = 'add';
  @Input('user') user: Table = {
    id: 0,
    photo: '',
    email: '',
    name: '',
    created_at: '',
    password: ''
  };
  public today = new Date();

  constructor(
    private userManagementService: UserManagementService,
    public datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    if (!this.user) {
      this.user = {
        id: 0,
        photo: '',
        email: '',
        name: '',
        created_at: '',
        password: ''
      };
    }
  }


  async save() {
    try {
      if (this.mode === 'edit') {
        await this.userManagementService.updateUser({
          email: this.user.email,
          name: this.user.name,
          password: this.user.password
        }, this.user.id).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      } else {
        await this.userManagementService.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        }).toPromise();
        Swal.fire('Created!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e);
    }
  }

}
