import {Component, OnInit} from '@angular/core';
import {Program} from "../model/program";
import {ProgramsService} from "../services/programs.service";


@Component({
  selector: 'app-apps-detail',
  templateUrl: './apps-detail.component.html',
  styleUrl: './apps-detail.component.css'
})
export class AppsDetailComponent implements OnInit{
  programs: Program[] = [];
  originalPrograms: Program[] = [];
  userId: number | null = null;
  constructor(public programsService:ProgramsService) {
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
        (programs: Program[]) => {
          this.programs = programs;
          this.originalPrograms = [...programs];
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
      this.programs = [...this.originalPrograms];
    } else {
      this.programs = this.originalPrograms.filter(program =>
        program.name.toLowerCase().includes(filter)
      );
    }
  }


}
