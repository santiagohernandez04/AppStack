import {Component, OnInit} from '@angular/core';
import {App} from "../model/app";
import {AppService} from "../services/app.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-apps-detail',
  templateUrl: './apps-detail.component.html',
  styleUrl: './apps-detail.component.css'
})
export class AppsDetailComponent implements OnInit {
  apps: App[] = [];
  originalApps: App[] = [];
  userId: number = 0;
  private intervalId: any;
  isFiltering: boolean = false;

  constructor(public programsService: AppService) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '', 10);
    if (this.userId) {
      this.getApps();
      this.startAutoRefresh();
    } else {
      console.error('No userId found in localStorage');
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getApps() {
    if (this.userId && !this.isFiltering) { // Only fetch apps if not filtering
      this.programsService.getApps(this.userId).subscribe(
        (programs: App[]) => {
          this.apps = programs;
          this.originalApps = [...programs];
        },
        error => {
          console.error('Error fetching apps:', error);
        }
      );
    }
  }

  startAutoRefresh() {
    this.intervalId = setInterval(() => {
      this.getApps();
    }, 3000);
  }

  programFilter(event: any) {
    this.isFiltering = true;
    const filter = event.target.value.trim().toLowerCase();
    if (!filter) {
      this.apps = [...this.originalApps];
      this.isFiltering = false;
    } else {
      this.apps = this.originalApps.filter(program =>
        program.name.toLowerCase().includes(filter)
      );
    }
  }

  createApps() {
    Swal.fire({
      title: 'Create app',
      width: '40em',
      html: `
        <swal-title>Name</swal-title>
        <input id="swal-input1" class="swal2-input" type="text">
        <br>
        <swal-title>Repository url</swal-title>
        <input id="swal-input2" class="swal2-input" type="text">
      `,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Add',
      focusCancel: true,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const repositoryUrl = (document.getElementById('swal-input2') as HTMLInputElement).value;

        if (!name || !repositoryUrl) {
          Swal.showValidationMessage('Please enter all fields');
          return null;
        }

        return {name, repositoryUrl};
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const {name, repositoryUrl} = result.value;
        this.programsService.postCreateApp(name, repositoryUrl, this.userId).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'App Created',
              text: 'App has been created successfully.'
            });
            this.getApps(); // Refresh apps list after creation
          },
          (error: HttpErrorResponse) => {
            console.error('App creation failed:', error);
            let errorMessage = 'An error occurred';
            if (error.error && error.error.error) {
              errorMessage = error.error.error;
            }
            Swal.fire({
              icon: 'error',
              title: 'App creation failed',
              text: errorMessage
            });
          }
        );
      }
    });
  }
}
