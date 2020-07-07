import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PhotoService {
  constructor(private httpClient: HttpClient) {}

  upload(vehicleId, photo) {
    let formData = new FormData();
    formData.append("file", photo);
    return this.httpClient.post(`/api/vehicles/${vehicleId}/photos`, formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  getPhotos(vehicleId) {
    return this.httpClient.get(`/api/vehicles/${vehicleId}/photos`);
  }
}
