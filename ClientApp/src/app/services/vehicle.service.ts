import { SaveVehicle } from "./../models/saveVehicle";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private readonly vehiclesEndpoint = "/api/vehicles";
  constructor(private httpClient: HttpClient) {}

  getMakes() {
    return this.httpClient.get("/api/makes");
  }

  getVehicle(id) {
    return this.httpClient.get(`${this.vehiclesEndpoint}/${id}`);
  }

  create(vehicle) {
    return this.httpClient.post(this.vehiclesEndpoint, vehicle);
  }

  update(vehicle: SaveVehicle) {
    return this.httpClient.put(
      `${this.vehiclesEndpoint}/${vehicle.id}`,
      vehicle
    );
  }

  delete(id) {
    return this.httpClient.delete(`${this.vehiclesEndpoint}/${id}`);
  }

  getVehicles(filter) {
    let queryString = this.toQueryString(filter);
    return this.httpClient.get(`${this.vehiclesEndpoint}?${queryString}`);
  }

  private toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) {
        parts.push(
          `${encodeURIComponent(property)}=${encodeURIComponent(value)}`
        );
      }
    }
    return parts.join("&");
  }
}
