import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  product: any[]=[]; //array 

  // YT Source https://www.youtube.com/watch?v=RSa1CB06rfQ&list=PLsjmv9aDmNDAN5adZxbGTlQHlgU2je7KE&index=7 15:30
  constructor( private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(prods =>{
      // this.products = prods.products;
      // console.log(prods);
    });
    // this.productService.showMessage();
  }

}
