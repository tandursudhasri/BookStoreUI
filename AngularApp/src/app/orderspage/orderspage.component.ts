import { Component } from '@angular/core';
import { AbstractHttpCommunication, book } from '../HttpCommunication';

@Component({
  selector: 'app-orderspage',
  templateUrl: './orderspage.component.html',
  styleUrls: ['./orderspage.component.css'],
})
export class OrderspageComponent {
  // orders: any[] = [];
  orderIds: any[] = [];
  errors: string = '';
  constructor(private service: AbstractHttpCommunication) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // loadOrders() {
  //   let temp = sessionStorage.getItem("id");
  //   let userId = 0;
  //   if(temp != null)
  //     userId = JSON.parse(temp);
  //   this.service.GetOrder(userId).subscribe(
  //     (data: any) => {
  //       this.orders = data;
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
  books: book[] = [];
  loadOrders() {
    let temp = sessionStorage.getItem('id');
    let userId = 0;
    if (temp != null) {
      userId = JSON.parse(temp);
    }
    let observable = this.service.GetOrderIds(userId);
    observable.subscribe({
      next: (result) => {
        this.orderIds = result;
        //var p = 10;
      },
      error: (err) => (this.errors = err.message),
    });
    // for(let i of this.orders){
    //  let observable = this.service.GetBook(i.bookId);
    // observable.subscribe({
    //   next: (result) => {
    //     this.books.push(result);
    //     //var p = 10;
    //   },
    //   error: (err) => (this.errors = err.message),
    // });
    // }
  }
  getOrderDetails(orderId: number) {
    var orders:any[]= [];
    let observable = this.service.GetOrder(orderId);
    observable.subscribe({
      next: (result) => {
        orders = result;
        //var p = 10;
      },
      error: (err) => (this.errors = err.message),
    });
    return orders;
  }
}
