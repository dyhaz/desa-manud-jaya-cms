import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '@shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterRoutingModule } from '@pages/master/master-routing.module';
import { TablesModule } from '@pages/tables/tables.module';
import { JenisPerizinanService, PerizinanService, ProgramDesaService, UserManagementService } from '@core/http/api';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    Ng2SmartTableModule,
    MasterRoutingModule,
    TablesModule,
    DropzoneModule,
    CurrencyMaskModule
  ],
  providers: [
    ProgramDesaService,
    UserManagementService,
    PerizinanService,
    JenisPerizinanService,
    DatePipe,
  ]
})
export class WargaModule { }
