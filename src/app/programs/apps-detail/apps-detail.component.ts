import {Component, OnInit} from '@angular/core';
import {App} from "../model/app";
import {AppService} from "../services/app.service";


@Component({
  selector: 'app-apps-detail',
  templateUrl: './apps-detail.component.html',
  styleUrl: './apps-detail.component.css'
})
export class AppsDetailComponent implements OnInit{
  apps: App[] = [];
  originalApps: App[] = [];
  userId: number | null = null;
  constructor(public programsService:AppService) {
  }
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '', 10); // Parseamos el userId guardado en localStorage
    if (this.userId) {
      this.getApps();
    } else {
      console.error('No userId found in localStorage');
    }
  }
  getApps() {
    if (this.userId) {
      this.programsService.getApps(this.userId).subscribe(
        (programs: App[]) => {
          this.apps = programs;
          this.originalApps = [...programs];
        },
        error => {
          console.error('Error fetching apps:', error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      );
    }
  }


  programFilter(event: any) {
    const filter = event.target.value.trim().toLowerCase();
    if (!filter) {
      this.apps = [...this.originalApps];
    } else {
      this.apps = this.originalApps.filter(program =>
        program.name.toLowerCase().includes(filter)
      );
    }
  }


}
