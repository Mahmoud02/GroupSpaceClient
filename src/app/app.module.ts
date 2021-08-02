import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SidebarModule} from 'ng-sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainGroupComponent } from './main-group/main-group.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PostComponent } from './main-group/post/post.component';
import { ChatComponent } from './main-group/chat/chat.component';
import {AuthenticationModule} from './authentication/authentication.module';
import { MainComponent } from './main-component/main.component';
import {UserGroupsComponent} from './main-component/user-groups/user-groups.component';
import { ManageGroupsComponent } from './main-component/manage-groups/manage-groups.component';
import { JoinedGroupsComponent } from './main-component/joined-groups/joined-groups.component';
import { SearchGroupsComponent } from './main-component/search-groups/search-groups.component';
import { FeedsComponent } from './main-component/feeds/feeds.component';
import { ProfileComponent } from './main-component/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GroupDetailsComponent } from './main-component/manage-groups/group-details/group-details.component';
import { GroupUsersComponent } from './main-component/manage-groups/group-details/group-users/group-users.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { GroupJoinedRequestsComponent } from './main-component/manage-groups/group-details/group-joined-requests/group-joined-requests.component';
import { GroupReportsComponent } from './main-component/manage-groups/group-details/group-reports/group-reports.component';
import { GroupInfoComponent } from './main-component/manage-groups/group-details/group-info/group-info.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    MainGroupComponent,
    UserGroupsComponent,
    PostComponent,
    ChatComponent,
    MainComponent,
    ManageGroupsComponent,
    JoinedGroupsComponent,
    SearchGroupsComponent,
    FeedsComponent,
    ProfileComponent,
    PageNotFoundComponent,
    GroupDetailsComponent,
    GroupUsersComponent,
    GroupJoinedRequestsComponent,
    GroupReportsComponent,
    GroupInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    AuthenticationModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
