import { Vehicle } from "./../models/vehicle";
import { SaveVehicle } from "./../models/saveVehicle";
import { FeatureService } from "./../services/feature.service";
import { VehicleService } from "../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { forkJoin } from "rxjs";
import * as _ from "underscore";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"],
})
export class VehicleFormComponent implements OnInit {
  makes;
  models;
  features;
  vehicle: SaveVehicle = {
    features: [],
    contact: {
      email: "",
      name: "",
      phone: "",
    },
    id: 0,
    isRegistered: true,
    makeId: 0,
    modelId: 0,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private featureService: FeatureService,
    private notifier: NotifierService
  ) {
    route.params.subscribe((p) => {
      this.vehicle.id = +p["id"];
    });
  }

  ngOnInit() {
    let sources = [
      this.vehicleService.getMakes(),
      this.featureService.getFeatures(),
    ];

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }
    forkJoin(sources).subscribe(
      (data) => {
        this.makes = data[0];
        this.features = data[1];
        if (this.vehicle.id) {
          this.setVehicle(<Vehicle>data[2]);
          this.populateModel();
        }
      },
      (err) => {
        if (err.status == 404) this.router.navigate(["/"]);
      }
    );
  }

  onMakeChange() {
    this.populateModel();
    delete this.vehicle.modelId;
  }

  onFeatureToggle(id, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      let index = this.vehicle.features.indexOf(id);
      this.vehicle.features.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.vehicle.id)
      this.vehicleService.update(this.vehicle).subscribe((data) => {
        this.notifier.notify("success", "The vehicle was successfully updated");
      });
    else
      this.vehicleService.create(this.vehicle).subscribe((data: Vehicle) => {
        this.notifier.notify("success", "The vehicle was successfully created");
        this.router.navigate([`/vehicles/${data.id}`]);
      });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.contact = v.contact;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.features = _.pluck(v.features, "id");
  }
  private populateModel() {
    let selectedMake = this.makes.find((m) => {
      return m.id === Number(this.vehicle.makeId);
    });
    this.models = selectedMake ? selectedMake.models : [];
  }
}
