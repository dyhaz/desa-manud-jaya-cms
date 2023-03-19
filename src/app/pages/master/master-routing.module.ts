import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramComponent } from './program/program.component';
import { UserManagementComponent } from '@pages/master/user/user.component';

const routes: Routes = [
  {
    path: 'program',
    component: ProgramComponent
  },
  {
    path: 'user',
    component: UserManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
