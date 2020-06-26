import { SaveVehicle } from "./../models/saveVehicle";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  getMakes() {
    return this.httpClient.get("/api/makes");
  }

  getVehicle(id) {
    return this.httpClient.get(`/api/vehicles/${id}`);
  }

  create(vehicle) {
    return this.httpClient.post("/api/vehicles", vehicle);
  }

  update(vehicle: SaveVehicle) {
    return this.httpClient.put(`/api/vehicles/${vehicle.id}`, vehicle);
  }

  delete(id) {
    return this.httpClient.delete(`/api/vehicles/${id}`);
  }
}
