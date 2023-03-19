import { Component, Input, OnInit } from "@angular/core";
import { ProgramService } from "@pages/master/program/program.service";
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from "@pages/master/program/program.model";
import Swal from "sweetalert2";
import { ProgramDesaService } from "@core/http/api";

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: [],
  providers: [ProgramService, DecimalPipe]
})

export class ProgramFormComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('mode') mode: 'edit'|'add' = 'add';
  @Input('program') program: Table = {
    program_id: 0,
    deskripsi_program: '',
    nama_program: '',
    tanggal_selesai: '',
    tanggal_mulai: '',
    foto: '',
    anggaran: ''
  };
  public today = new Date();

  constructor(
    private programDesa: ProgramDesaService,
    public datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {

  }


  async save() {
    try {
      if (this.mode === 'edit') {
        await this.programDesa.updateProgramDesa(this.program.program_id, this.program).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      } else {
        await this.programDesa.storeProgramDesa(this.program).toPromise();
        Swal.fire('Created!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e);
    }
  }

}
