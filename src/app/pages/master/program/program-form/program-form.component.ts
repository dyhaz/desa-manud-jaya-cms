import { Component, Input, OnInit } from "@angular/core";
import { ProgramService } from "@pages/master/program/program.service";
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from "@pages/master/program/program.model";
import Swal from "sweetalert2";
import { ProgramDesaService } from "@core/http/api";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

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
  config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    method: 'POST',
    uploadMultiple: false,
    accept: (file) => {
      this.onAccept(file);
    }
  };

  constructor(
    private programDesa: ProgramDesaService,
    public datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    if (!this.program) {
      this.program = {
        program_id: 0,
        deskripsi_program: '',
        nama_program: '',
        tanggal_selesai: '',
        tanggal_mulai: '',
        foto: '',
        anggaran: ''
      };
    }
  }

  onAccept(file: any) {
    const fileToBase64 = (file:File):Promise<string> => {
      return new Promise<string> ((resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.toString());
        reader.onerror = error => reject(error);
      })
    }

    fileToBase64(file)
      .then(result=>{
         // To remove data url part
        this.program.foto =  result.replace('data:', '')
          .replace(/^.+,/, '');
      });
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
