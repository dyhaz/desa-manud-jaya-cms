import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '@shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgramComponent } from './program/program.component';
import { MasterRoutingModule } from '@pages/master/master-routing.module';
import { TablesModule } from '@pages/tables/tables.module';
import { AdvancedSortableDirective } from '@pages/tables/advancedtable/advanced-sortable.directive';
import { ProgramDesaService } from '@core/http/api';
import { ProgramFormComponent } from '@pages/master/program/program-form/program-form.component';

@NgModule({
  declarations: [ProgramComponent, ProgramFormComponent, AdvancedSortableDirective],
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
    TablesModule
  ],
  providers: [
    ProgramDesaService,
    DatePipe
  ]
})
export class MasterModule { }
