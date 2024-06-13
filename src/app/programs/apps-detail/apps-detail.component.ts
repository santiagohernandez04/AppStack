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
  constructor(public programsService:ProgramsService) {
  }
  ngOnInit(): void {
    this.getPrograms();
  }
  getPrograms() {
    this.programsService.getPrograms().subscribe(
      (programs2: Array<Program>) => {
        this.programs = programs2;
        this.originalPrograms = [...programs2];
      }
    );
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
