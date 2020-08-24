import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ManagementAuditComponent } from "./management-audit/management-audit.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { ManagementRolesComponent } from "./management-roles/management-roles.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { ProjectComponent } from "./project/project.component";
import { FailComponent } from "./fail/fail.component";
import { ActivityComponent } from "./activity/activity.component";
import { CommentComponent } from "./comment/comment.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { FailDetailsComponent } from "./fail-details/fail-details.component";
import { ActivityDetailsComponent } from "./activity-details/activity-details.component";
import { CommentDetailsComponent } from "./comment-details/comment-details.component";
import { CalendarComponent } from "./calendar/calendar.component";

export const AdminRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "project",
        component: ProjectComponent,
      },
      { path: "project-details/:id", component: ProjectDetailsComponent },
      { path: "fail-details/:id", component: FailDetailsComponent },
      { path: "activity-details/:id", component: ActivityDetailsComponent },
      { path: "comment-details/:id", component: CommentDetailsComponent },
      {
        path: "fail",
        component: FailComponent,
      },
      {
        path: "activity",
        component: ActivityComponent,
      },
      {
        path: "calendar",
        component: CalendarComponent,
      },
      {
        path: "comment",
        component: CommentComponent,
      },
      {
        path: "analytics",
        component: AnalyticsComponent,
      },
      {
        path: "report",
        component: ReportComponent,
      },
      {
        path: "management",
        children: [
          {
            path: "users",
            component: ManagementUserComponent,
          },
          {
            path: "roles",
            component: ManagementRolesComponent,
          },
          {
            path: "audit-trails",
            component: ManagementAuditComponent,
          },
        ],
      },
    ],
  },
];
