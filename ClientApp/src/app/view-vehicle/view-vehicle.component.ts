import { FeatureService } from "./../services/feature.service";
import { VehicleService } from "./../services/vehicle.service";
import { Vehicle } from "./../models/vehicle";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "underscore";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.css"],
})
export class ViewVehicleComponent implements OnInit {
  features;
  vehicle: Vehicle = {
    features: [],
    contact: {
      email: "",
      name: "",
      phone: "",
    },
    id: 0,
    isRegistered: true,
    make: { name: "", id: 0 },
    model: { name: "", id: 0 },
    lastUpdate: "",
  };
  constructor(
    private featureService: FeatureService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((p) => {
      this.vehicle.id = +p["id"];
    });
  }

  ngOnInit() {
    this.featureService
      .getFeatures()
      .subscribe((data) => (this.features = data));

    this.vehicleService.getVehicle(this.vehicle.id).subscribe((v: any) => {
      this.vehicle = <Vehicle>v;
      this.vehicle.features = _.pluck(v.features, "id");
    });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe((data) => {
        this.router.navigate(["/"]);
      });
    }
  }
}
