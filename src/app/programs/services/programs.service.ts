import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Program } from "../model/program";

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private baseUrl: string = "https://my-json-server.typicode.com/santiagohernandez04/apps-api/db";

  constructor(private httpClient: HttpClient) { }

  getPrograms(): Observable<Program[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map((response: any) => response.program as Program[])
    );
  }

}
