import { Component } from '@angular/core';
import { AbstractHttpCommunication, book } from '../HttpCommunication';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
    books: book[] = [];
    errors!: string;
    bk!: book;
	  statusDetails: string = '';
    constructor(private service: AbstractHttpCommunication) {}
    ngOnInit() {
      this.getBooks();
    }
    getBooks(): void {
      let observable = this.service.GetAllBooks();
      observable.subscribe({
        next: (result) => {
          this.books = result;
          //var p = 10;
        },
        error: (err) => (this.errors = err.message),
      });
    }
    deleteBook(Id:number){
      var confirmation=confirm('Delete Record?');
      if(confirmation==true)
      {
        let observable=this.service.DeleteBook(Id);
        observable.subscribe({
          next:(result:any)=>{
            alert(result.statusText);
            this.getBooks();
          },
          error:err=>this.errors=err.message
        });
      }
    }
    add() {
      let observable = this.service.Add(this.bk);
      observable.subscribe({
        next: (result) => alert(JSON.stringify(result)),
        error: (err) => (this.statusDetails = err.message),
      });
    }
  }
