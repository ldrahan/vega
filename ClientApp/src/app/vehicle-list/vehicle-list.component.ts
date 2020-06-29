import { KeyValuePair } from "./../models/keyValuePair";
import { Vehicle } from "./../models/vehicle";
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = { makeId: 0 };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    let sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles(),
    ];

    forkJoin(sources).subscribe((data) => {
      this.makes = <KeyValuePair[]>data[0];
      this.vehicles = this.allVehicles = <Vehicle[]>data[1];
    });
  }

  onFilterChange() {
    if (this.filter.makeId) {
      let vehicles = this.allVehicles.filter(
        (v) => v.make.id == Number(this.filter.makeId)
      );
      this.vehicles = vehicles;
    } else this.vehicles = this.allVehicles;
  }
  resetFilter() {
    this.filter = {};
    this.vehicles = this.allVehicles;
  }
}
