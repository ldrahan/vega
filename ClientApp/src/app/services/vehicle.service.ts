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

  create(vehicle) {
    console.log(vehicle);
    return this.httpClient
      .post("/api/vehicles", vehicle)
      .subscribe((data) => {});
  }
}
