import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MakeService {
  constructor(private httpClient: HttpClient) {}

  getMakes() {
    return this.httpClient.get("/api/makes");
  }
}
