import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { App } from "../model/app";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private loginUrl: string = "/api/default/login";
  private createAppUrl: string = "/api/default/apps";
  private getAppsUrl: string = "/api/default/apps/users";
  private createUserUrl: string = "/api/default/signup";
  constructor(private httpClient: HttpClient) { }

  postLogin(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.httpClient.post<any>(this.loginUrl, body).pipe(
      map((response: any) => response.data)
    );
  }

  postCreateApp(name: string, repositoryUrl: string, userId: number, deploymentDirectory: string = "/docs/"): Observable<any> {
    const body = {
      name: name,
      repository_url: repositoryUrl,
      user_id: userId,
      deployment_directory: deploymentDirectory
    };
    return this.httpClient.post<any>(this.createAppUrl, body).pipe(
      map((response: any) => response.data)
    );
  }

  getApps(userId: number): Observable<App[]> {
    return this.httpClient.get<any>(`${this.getAppsUrl}/${userId}`).pipe(
      map((response: any) => response.data as App[])
    );
  }

  createUser(name: string, lastName: string, email: string, password: string): Observable<any> {
    const body = {
      name: name,
      last_name: lastName,
      email: email,
      password: password
    };
    return this.httpClient.post<any>(this.createUserUrl, body).pipe(
      map((response: any) => response.data)
    );
  }
}
