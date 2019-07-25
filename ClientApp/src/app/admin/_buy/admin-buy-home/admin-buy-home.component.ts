import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-buy-home',
  templateUrl: './admin-buy-home.component.html',
  styleUrls: ['./admin-buy-home.component.scss'],
  animations: [
    trigger('flyInVez', [
      transition(':enter', [
        query('.card, div', [
          style({ opacity: 0, transform: 'translateY(100px)' }),
          stagger(100, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            )
          ])
        ])
      ])
    ])
  ]
})
export class AdminBuyHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
