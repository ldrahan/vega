import { KeyValuePair } from "./../models/keyValuePair";
import { Vehicle } from "./../models/vehicle";
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService
      .getMakes()
      .subscribe((data) => (this.makes = <KeyValuePair[]>data));

    this.populateVehicles();
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter).subscribe((data) => {
      this.vehicles = <Vehicle[]>data;
    });
  }
}
