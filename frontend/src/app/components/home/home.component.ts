import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // YT Source https://www.youtube.com/watch?v=RSa1CB06rfQ&list=PLsjmv9aDmNDAN5adZxbGTlQHlgU2je7KE&index=7 10:56
  constructor( private productService: ProductService) { }

  ngOnInit(): void {
  }

}
