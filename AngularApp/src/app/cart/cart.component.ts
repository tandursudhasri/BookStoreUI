import { Component, Injectable } from '@angular/core';
import { book, HttpCommunication } from '../HttpCommunication';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

@Injectable({ providedIn : 'root' })
export class CartComponent {
  // items: book[] = [];

  constructor(private service : HttpCommunication) {}

  addToCart(item: book) {
    this.service.items.push(item);
    alert(JSON.stringify(this.service.items));
  }

  removeItems(itemIndex: number) {
    this.service.items.splice(itemIndex, 1);
  }

  getItems() {
    alert(JSON.stringify(this.service.items));
    return this.service.items;
  }
}
