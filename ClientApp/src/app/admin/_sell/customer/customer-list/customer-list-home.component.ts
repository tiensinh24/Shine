import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customer-list-home",
  templateUrl: "./customer-list-home.component.html",
  styleUrls: ["./customer-list-home.component.scss"]
})
export class CustomerListHomeComponent implements OnInit {
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
    const dm = localStorage.getItem("customerDisplayMode");

    if (dm === "true") {
      this.displayMode = true;
    } else {
      this.displayMode = false;
    }
  }

  setDisplayMode($event: boolean) {
    localStorage.setItem("customerDisplayMode", `${$event}`);
  }
}
