import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
import { QuillModule } from "ngx-quill";
import { NgxDropzoneModule } from "ngx-dropzone";
import { OrgChartModule } from "angular-org-chart";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { FailComponent } from "./fail/fail.component";
import { ProjectComponent } from "./project/project.component";

import { ManagementAuditComponent } from "./management-audit/management-audit.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { ManagementRolesComponent } from "./management-roles/management-roles.component";

import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { CommentComponent } from "./comment/comment.component";
import { ActivityComponent } from "./activity/activity.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { FailDetailsComponent } from './fail-details/fail-details.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    ManagementAuditComponent,
    ManagementUserComponent,
    ManagementRolesComponent,
    ReportComponent,
    DashboardComponent,
    FailComponent,
    ProjectComponent,
    CommentComponent,
    ActivityComponent,
    AnalyticsComponent,
    ProjectDetailsComponent,
    ProjectDetailsComponent,
    FailDetailsComponent,
    ActivityDetailsComponent,
    CommentDetailsComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes),
    QuillModule.forRoot(),
    NgxDropzoneModule,
    OrgChartModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    LeafletModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
