import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-employee-list-home",
  templateUrl: "./employee-list-home.component.html",
  styleUrls: ["./employee-list-home.component.scss"]
})
export class EmployeeListHomeComponent implements OnInit {
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
    const dm = localStorage.getItem("employeeDisplayMode");

    if (dm === "true") {
      this.displayMode = true;
    } else {
      this.displayMode = false;
    }
  }

  setDisplayMode($event: boolean) {
    localStorage.setItem("employeeDisplayMode", `${$event}`);
  }
}
