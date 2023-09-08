import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractHttpCommunication, appUser } from '../HttpCommunication';
import { LoginpageComponent } from '../loginpage/loginpage.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
// export class SignupComponent {
//   message: string = '';

//   constructor(
//     private router: Router,
//     private service: AbstractHttpCommunication
//   ) {}
//   statusDetails: string = '';
//   getToken(name: string, email: string, contact: string, pwd: string): void {
//     var observableObj = this.service.SignUp(name, email, pwd, contact);
//     observableObj.subscribe({
//       next: (result) => {
//         alert(JSON.stringify(result));
//         this.router.navigate(['/login']);
//       },
//       error: (err) => (this.statusDetails = err.message),
//     });
//     alert('Ok');
//   }
// }
export class SignupComponent {
  // user:appUser;
  uname: FormControl;
  pass: FormControl;
  email: FormControl;
  contact: FormControl;
  frmGroup: FormGroup;
  statusDetails: string = '';

  constructor(
    private router: Router,
    private service: AbstractHttpCommunication,
    private login:LoginpageComponent
  ) {
    this.uname = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{3,20}$'),
      ])
    );
    this.contact = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ])
    );
    this.email = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    );
    this.pass = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    );

    this.frmGroup = new FormGroup({
      n: this.uname,
      e: this.email,
      c: this.contact,
      p: this.pass,
    });
    // this.user = new appUser('','','', '');
  }
  submit(): void {
    if (this.frmGroup.invalid) alert('Invalid Form');
    else {
      // this.user.userName = this.uname.value;
      // this.user.userEmail = this.email.value;
      // this.user.userContactNo = this.contact.value;
      // this.user.userPass = this.email.value;
      var observableObj = this.service.SignUp(
        this.uname.value,
        this.email.value,
        
        this.pass.value,
        this.contact.value
      );
      observableObj.subscribe({
        next: (result) => {
          alert(JSON.stringify(result));
          //this.router.navigate(['/login']);
          this.login.getToken(this.uname.value, this.pass.value);
        },
        error: (err) => (this.statusDetails = err.message),
      });
      alert('Ok');
      // alert(JSON.stringify(this.user));
    }
  }
}
