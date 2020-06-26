import { AppErrorHandler } from "./app.error-handler";
import { FeatureService } from "./services/feature.service";
import { VehicleService } from "./services/vehicle.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotifierModule } from "angular-notifier";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { VehicleFormComponent } from "./vehicle-form/vehicle-form.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
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
      { path: "vehicles/:id", component: VehicleFormComponent },
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
    ]),
  ],
  providers: [
    VehicleService,
    FeatureService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
