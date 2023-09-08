import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStoreApp';
  isLoggedIn: string | null = "";
  loginrole: string | null = "";
  
  constructor(private router: Router,){}
  
  ngOnInit(){
    this.isLoggedIn = sessionStorage.getItem('token');
    this.loginrole = sessionStorage.getItem("role");
    
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
