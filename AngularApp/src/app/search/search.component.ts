import { Component, Injectable } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { AbstractHttpCommunication,book, HttpCommunication } from '../HttpCommunication';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
 items!: book[] ;
  errors!: string;
  temp:string='';
  searchforbook:string|null='';
  constructor(private service: HttpCommunication, private cart: CartComponent) {}
  ngOnInit() {
    this.searchforbook=sessionStorage.getItem('search');
    if(this.searchforbook!==null) {
      this.getBooksByName(this.searchforbook);
      this.getBooksByAuthor(this.searchforbook);
    }

  }
  getBooksByName(name:string): void {    
    let observable = this.service.GetBookName(name);
    observable.subscribe({
      next: (result) => {
        // this.service.items = result;
        this.items=result;
        //var p = 10;
      },
      error: (err) => (this.errors = err.message),
    });
    this.temp=name;    
    // if(this.bk!==null)
    // this.books.push(this.bk);
    // alert(JSON.stringify(this.books));
  }
  getBooksByAuthor(name:string): void {    
    let observable = this.service.GetBookAuthor(name);
    observable.subscribe({
      next: (result) => {
        // this.service.items = result;
        this.items=result;
        //var p = 10;
        // alert(JSON.stringify(this.bk));
      },
      error: (err) => (this.errors = err.message),
    });
    
    this.temp=name;
    // if(this.bk!=null)
    // this.books.push(this.bk);
  }
  addToCart(b:book) : void {
    this.cart.addToCart(b);
  }
}
