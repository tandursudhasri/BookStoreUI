import { Component } from '@angular/core';
import { AbstractHttpCommunication, book } from 'src/app/HttpCommunication';

@Component({
  selector: 'app-bookaddandupdate',
  templateUrl: './bookaddandupdate.component.html',
  styleUrls: ['./bookaddandupdate.component.css']
})
export class BookaddandupdateComponent {
  bk:book;
	statusDetails: string = '';
	constructor(public service: AbstractHttpCommunication) {
		this.bk = new book('',0,'', 0, 0,'');
	}
	add() {
    let observable = this.service.Add(this.bk);
    observable.subscribe({
      next: (result) => alert(JSON.stringify(result)),
      error: (err) => (this.statusDetails = err.message),
    });
  }
	update() {
		let observable = this.service.UpdateBook(this.bk);
		observable.subscribe({
			next: (result) => alert(JSON.stringify(result)),
			error: (err) => (this.statusDetails = err.message),
		});
	}
}
