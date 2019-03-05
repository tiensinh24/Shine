import { Component, OnInit } from '@angular/core';
import { CategoryBuy } from '../_interfaces/category-buy';
import { CategoryBuyService } from '../_services/category-buy.service';

@Component({
  selector: 'app-category-buy-home',
  templateUrl: './category-buy-home.component.html',
  styleUrls: ['./category-buy-home.component.css']
})
export class CategoryBuyHomeComponent implements OnInit {
  title = 'Category List';
  categories: CategoryBuy[];

  constructor(private categoryBuyService: CategoryBuyService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryBuyService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

}
