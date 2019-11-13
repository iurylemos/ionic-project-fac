import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-product',
  templateUrl: './data-product.page.html',
  styleUrls: ['./data-product.page.scss'],
})
export class DataProductPage implements OnInit {

  private productData: any

  constructor(private activedRouter: ActivatedRoute) { 
    this.productData = this.activedRouter.snapshot.params;
    console.log('Entrou no dados do produto: ', this.productData)
  }

  ngOnInit() {
  }

}
