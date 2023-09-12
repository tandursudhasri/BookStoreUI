import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractHttpCommunication } from '../HttpCommunication';

@Component({
  selector: 'app-addresspage',
  templateUrl: './addresspage.component.html',
  styleUrls: ['./addresspage.component.css']
})
export class AddresspageComponent {
  private uid : number = 0;
    constructor(private service: AbstractHttpCommunication, private router: Router) {}
    updateAddress(address: string){
      var id = sessionStorage.getItem('id');
      if(id !== null){
        this.uid = JSON.parse(id);
      }
      this.service.UpdateAddress(this.uid, address);
      
      this.router.navigate(['/orders']);
    }
}
