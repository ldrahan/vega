import { PhotoService } from "./services/photo.service";
import { PaginationComponent } from "./shared/pagination.component";
import { AppErrorHandler } from "./app.error-handler";
import { FeatureService } from "./services/feature.service";
import { VehicleService } from "./services/vehicle.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotifierModule } from "angular-notifier";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { VehicleFormComponent } from "./vehicle-form/vehicle-form.component";
import { VehicleListComponent } from "./vehicle-list/vehicle-list.component";
import { ViewVehicleComponent } from "./view-vehicle/view-vehicle.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    NgbModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: "right",
          distance: 12,
        },
        vertical: {
          position: "top",
          distance: 12,
          gap: 10,
        },
      },
      theme: "material",
      behaviour: {
        autoHide: 3000,
      },
    }),
    FormsModule,
    RouterModule.forRoot([
      { path: "vehicles/new", component: VehicleFormComponent },
      { path: "vehicles/edit/:id", component: VehicleFormComponent },
      { path: "vehicles/:id", component: ViewVehicleComponent },
      { path: "vehicles", component: VehicleListComponent },
      { path: "", redirectTo: "/vehicles", pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
    ]),
  ],
  providers: [
    VehicleService,
    FeatureService,
    PhotoService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
