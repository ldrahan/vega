import { PhotoService } from "./../services/photo.service";
import { FeatureService } from "./../services/feature.service";
import { VehicleService } from "./../services/vehicle.service";
import { Vehicle } from "./../models/vehicle";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "underscore";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.css"],
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput", { static: false, read: ElementRef })
  fileInput: ElementRef;
  features;
  photos = [];
  progress: number;
  vehicle: Vehicle = {
    features: [],
    contact: {
      email: "",
      name: "",
      phone: "",
    },
    id: 0,
    isRegistered: true,
    make: { name: "", id: 0 },
    model: { name: "", id: 0 },
    lastUpdate: "",
  };
  constructor(
    private featureService: FeatureService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((p) => {
      this.vehicle.id = +p["id"];
    });
  }

  ngOnInit() {
    this.featureService
      .getFeatures()
      .subscribe((data) => (this.features = data));

    this.vehicleService.getVehicle(this.vehicle.id).subscribe((v: any) => {
      this.vehicle = <Vehicle>v;
      this.vehicle.features = _.pluck(v.features, "id");
    });
    this.photoService
      .getPhotos(this.vehicle.id)
      .subscribe((data: []) => (this.photos = data));
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id).subscribe((data) => {
        this.router.navigate(["/"]);
      });
    }
  }
  uploadPhoto() {
    this.progress = 1;
    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    let file = nativeElement.files[0];
    this.photoService.upload(this.vehicle.id, file).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((100 / event.total) * event.loaded);
        } else if (event.type == HttpEventType.Response) {
          this.photos.push(event.body);
          this.progress = null;
        }
      },
      (err) => {
        this.progress = null;
        throw err;
      },
      () => {
        nativeElement.value = "";
      }
    );
  }
}
