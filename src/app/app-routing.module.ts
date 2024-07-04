import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberFormComponent } from './components/member-form/member-form.component';

const routes: Routes = [
  {
    path: 'members',
    component: MemberListComponent
  },
  {
    path: 'members/new',
    component: MemberFormComponent
  },
  {
    path: 'members/edit/:id',
    component: MemberFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

