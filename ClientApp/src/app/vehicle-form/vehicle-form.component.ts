import { FeatureService } from "./../services/feature.service";
import { VehicleService } from "../services/vehicle.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"],
})
export class VehicleFormComponent implements OnInit {
  makes;
  models;
  features;
  vehicle: any = {
    features: [],
    contact: {},
  };

  constructor(
    private vehicleService: VehicleService,
    private featureService: FeatureService
  ) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe((makes) => {
      this.makes = makes;
    });
    this.featureService.getFeatures().subscribe((features) => {
      this.features = features;
    });
  }

  onMakeChange() {
    let selectedMake = this.makes.find((m) => {
      return m.id === Number(this.vehicle.makeId);
    });

    this.models = selectedMake ? selectedMake.models : [];
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
    this.vehicleService.create(this.vehicle);
  }
}
