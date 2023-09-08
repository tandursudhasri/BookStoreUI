import { Component } from '@angular/core';
import { AbstractHttpCommunication, book } from '../HttpCommunication';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  books: book[] = [];
  errors!: string;
  constructor(private service: AbstractHttpCommunication) {}
  ngOnInit() {
    // appComponent.isLoggedIn = sessionStorage.getItem('token');
    // appComponent.loginrole = sessionStorage.getItem("role");
    this.getBooks();
  }
  getBooks(): void {
    let observable = this.service.GetAllBooks();
    observable.subscribe({
      next: (result) => {
        this.books = result;
        var p = 10;
      },
      error: (err) => (this.errors = err.message),
    });
  }
}
