import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "../../programs/services/app.service";
import Swal from "sweetalert2";
import swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private programsService: AppService) { }

  login() {
    this.programsService.postLogin(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('userId', response.id);
        console.log('Login successful:', response);
        this.router.navigate(['home']);
      },
      error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect username or password. Please try again",
          footer: '<a href="#">Dont have an account? Create an account</a>'
        });
      }
    );
  }

  createAccount() {
    Swal.fire({
      title: 'Create user',
      width: '40em',
      html: `
        <swal-title>Name</swal-title>
        <input id="swal-input1" class="swal2-input" type="text">
        <br>
        <swal-title>Last name</swal-title>
        <input id="swal-input2" class="swal2-input" type="text">
        <br>
        <swal-title>Email</swal-title>
        <input id="swal-input3" class="swal2-input" type="email">
        <br>
        <swal-title>Password</swal-title>
        <input id="swal-input4" class="swal2-input" type="password">
      `,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      focusCancel: true,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const lastName = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const email = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const password = (document.getElementById('swal-input4') as HTMLInputElement).value;

        if (!name || !lastName || !email || !password) {
          Swal.showValidationMessage('Please enter all fields');
          return null;
        }

        return { name, lastName, email, password };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { name, lastName, email, password } = result.value;
        this.programsService.createUser(name, lastName, email, password).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'User Created',
              text: 'User has been created successfully.'
            });
          },
          error => {
            console.error('User creation failed:', error);
            Swal.fire({
              icon: 'error',
              title: 'User Creation Failed',
              text: 'There was an error creating the user.'
            });
          }
        );
      }
    });
  }
}
