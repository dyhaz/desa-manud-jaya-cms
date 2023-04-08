import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from '@pages/master/user/user.model';
import Swal from 'sweetalert2';
import { UserManagementService, Warga, WargaService } from '@core/http/api';
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
    password: '',
    phone: ''
  };
  warga: Warga = {
    warga_id: 0,
    alamat: '',
    email: '',
    nik: '',
    nama_warga: '',
    nomor_telepon: '',
    created_at: '',
    updated_at: ''
  };

  public today = new Date();

  constructor(
    private userManagementService: UserManagementService,
    private wargaService: WargaService,
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
        password: '',
        phone: ''
      };
    }
  }


  async save() {
    try {
      if (this.mode === 'edit') {
        await this.userManagementService.updateUser({
          email: this.user.email,
          name: this.user.name,
          password: this.user.password,
          phone: this.user.phone
        }, this.user.id).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      } else {
        await this.wargaService.storeWarga({
          nik: this.warga.nik,
          alamat: this.warga.alamat,
          email: this.user.email,
          nomor_telepon: this.user.phone,
          nama_warga: this.user.name
        }).toPromise();
        await this.userManagementService.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone
        }).toPromise();
        Swal.fire('Created!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }

}
