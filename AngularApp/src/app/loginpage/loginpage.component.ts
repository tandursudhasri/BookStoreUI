import { Component, Injectable } from '@angular/core';
import { AbstractHttpCommunication } from '../HttpCommunication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
@Injectable({ providedIn: 'root' })
export class LoginpageComponent {
  message: string = '';

  constructor(
    private router: Router,
    private service: AbstractHttpCommunication
  ) {}
  getToken(userid: string, pwd: string): void {
    var observableObj = this.service.getTokenAndAccesProtectedResources(
      userid,
      pwd
    );
    observableObj.subscribe({
      next: (result) => {
        var res = JSON.stringify(result.body);
        var output = JSON.parse(res);

        sessionStorage.setItem('token', output.token);
        sessionStorage.setItem('role', output.role);

        if (sessionStorage.getItem('role') == 'Customer') {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/adminpage']);
        }
      },
      error: (err) => {
        
        this.message = err.message;
      },
    });
    alert('Ok');
  }

  // logout(): void {
  //   sessionStorage.clear();
  // }
}

// sessionStorage.clear();
// sessionStorage.removeItem('token');
// alert(JSON.stringify(result));
