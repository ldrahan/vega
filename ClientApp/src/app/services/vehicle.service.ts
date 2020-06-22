import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getMakes() {
    return this.httpClient.get("/api/makes");
  }

  create(vehicle) {
    console.log(vehicle);
    return this.httpClient
      .post("/api/vehicles", vehicle, this.httpOptions)
      .subscribe(
        (data) => console.log("success", data),
        (error) => console.log("oops", error)
      );
  }
}
