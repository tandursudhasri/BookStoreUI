import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import {
  AbstractHttpCommunication,
  HttpCommunication,
} from './HttpCommunication';
import { HttpClientModule } from '@angular/common/http';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignupComponent } from './signup/signup.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { CategoryComponent } from './category/category.component';
import { BookaddandupdateComponent } from './bookaddandupdate/bookaddandupdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
// import {BookopComponent } from './bookop/bookop.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    SignupComponent,
    AdminpageComponent,
    CategoryComponent,
    BookaddandupdateComponent,
    CartComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule,FormsModule, ReactiveFormsModule],
  providers: [
    { provide: AbstractHttpCommunication, useClass: HttpCommunication },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
