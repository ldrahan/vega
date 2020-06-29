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
  query: any = {};

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
    this.query = {};
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe((data) => {
      this.vehicles = <Vehicle[]>data;
    });
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = false;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }
}
