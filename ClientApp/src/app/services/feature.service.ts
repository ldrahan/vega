import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FeatureService {
  constructor(private httpClient: HttpClient) {}

  getFeatures() {
    return this.httpClient.get("/api/features");
  }
}
