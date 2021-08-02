import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {MainComponent} from './main-component/main.component';
import {AuthGuard} from './guard/auth.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SearchGroupsComponent} from './main-component/search-groups/search-groups.component';
import {ManageGroupsComponent} from './main-component/manage-groups/manage-groups.component';
import {JoinedGroupsComponent} from './main-component/joined-groups/joined-groups.component';
import {FeedsComponent} from './main-component/feeds/feeds.component';
import {ProfileComponent} from './main-component/profile/profile.component';
import {GroupDetailsComponent} from './main-component/manage-groups/group-details/group-details.component';
import {GroupUsersComponent} from './main-component/manage-groups/group-details/group-users/group-users.component';
import {GroupJoinedRequestsComponent} from './main-component/manage-groups/group-details/group-joined-requests/group-joined-requests.component';
import {GroupInfoComponent} from './main-component/manage-groups/group-details/group-info/group-info.component';
import {MainGroupComponent} from './main-group/main-group.component';

const routes: Routes = [
  { path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'find', // child route path
        component: SearchGroupsComponent,
      },
      {
        path: 'group/:id',
        component: MainGroupComponent,
      },
      {
        path: 'manage',
        component: ManageGroupsComponent,
      },
      {
        path: 'dashboard/:id',
        component: GroupDetailsComponent,
        children: [
          {
            path: 'users', // child route path
            component: GroupUsersComponent,
          },
          {
            path: 'joinRequests', // child route path
            component: GroupJoinedRequestsComponent,
          },
          {
            path: 'reports', // child route path
            component: GroupJoinedRequestsComponent,
          },
          {
            path: 'info', // child route path
            component: GroupInfoComponent,
          },
          {
            path: '', // child route path
            component: GroupUsersComponent,
          }
          ]
      },
      {
        path: 'joined',
        component: JoinedGroupsComponent,
      },
      {
        path: 'feeds',
        component: FeedsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: '',   redirectTo: '/feeds', pathMatch: 'full'},
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
