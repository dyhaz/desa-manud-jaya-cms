import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProgramService } from '@pages/master/program/program.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from '@pages/master/program/program.model';
import Swal from 'sweetalert2';
import { ProgramDesaService } from '@core/http/api';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: [],
  providers: [ProgramService, DecimalPipe]
})

export class ProgramFormComponent implements OnInit, AfterViewInit {
  @ViewChild('dropzone') dropzone: DropzoneComponent;
  @Input('modal') modal: any;
  @Input('mode') mode: 'edit'|'add' = 'add';
  @Input('program') program: Table = {
    program_id: 0,
    deskripsi_program: '',
    nama_program: '',
    tanggal_selesai: '',
    tanggal_mulai: '',
    foto: '',
    anggaran: '',
    status: false
  };
  public today = new Date();
  config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    method: 'POST',
    uploadMultiple: false,
    autoProcessQueue: true,
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

  ngAfterViewInit(): void {
    if (this.program) {
      this.addImageToDropzone('data:image/png;base64,' + this.program.foto);
    }
  }

  addImageToDropzone(imageData: string) {
    // Get a reference ot the dropzone component
    const dropzone = this.dropzone.directiveRef.dropzone();

    const blob = new Blob([imageData], { type: 'image/png' });
    const imageFile = new File([blob], 'foto.png', { type: 'image/png' });
    dropzone.addFile( imageFile );
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
      await Swal.fire('Error', e?.body?.error);
    }
  }

}
