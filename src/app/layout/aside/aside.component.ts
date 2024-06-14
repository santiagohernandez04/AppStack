import { Component } from '@angular/core';
import {Router} from "@angular/router";
import swal from'sweetalert2';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  constructor(private router:Router) {
  }
  programs(){
    this.router.navigate(['home/program']);
  }
  home(){
    this.router.navigate(['home']);
  }
  documentation(){
    this.router.navigate(['home/document']);
  }
  more(){
    this.router.navigate(['home/more']);
  }
  logout(){
    swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "yes, log out",
      cancelButtonText:"Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['']);
      }
    });

  }
}
