import { Component, OnInit } from '@angular/core';
import { CategoryBuy } from '../_interfaces/categoryBuy';
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
    this.categoryBuyService.getCategoryBuyList().subscribe(res => {
      this.categories = res;
    });
  }

}
