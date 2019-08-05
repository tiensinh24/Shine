import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-supplier-list-home",
  templateUrl: "./supplier-list-home.component.html",
  styleUrls: ["./supplier-list-home.component.scss"]
})
export class SupplierListHomeComponent implements OnInit {
  displayMode = true;

  constructor() {}

  ngOnInit() {
    this.getDisplayMode();
  }

  toggleDisplay($event: boolean) {
    this.displayMode = $event;

    this.setDisplayMode($event);
  }

  getDisplayMode() {
    const dm = localStorage.getItem("supplierDisplayMode");

    if (dm === "true") {
      this.displayMode = true;
    } else {
      this.displayMode = false;
    }
  }

  setDisplayMode($event: boolean) {
    localStorage.setItem("supplierDisplayMode", `${$event}`);
  }
}
