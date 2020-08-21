import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from "rxjs/operators";
import { Fitness } from "../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component";
import { User } from "../user";
const httpOptions = {
  headers: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }),
};

@Injectable({ providedIn: "root" })
export class UserService {
  public static BaseUrl =
    "http://localhost:6565/";

  shareddata: User;

  constructor(private http: Http) {}
  postfitnessdata(data) {
    return this.http
      .post(UserService.BaseUrl + "allfriends", data, httpOptions)
      .pipe(map((response: Response) => response.json()));
  }
  getfitnessdata() {
    return this.http
      .get(UserService.BaseUrl + "allfriends", httpOptions)
      .pipe(map((response: Response) => response.json()));
  }
  deletefitnessdata(id) {
    const url = UserService.BaseUrl + "allfriends/" + `${id}`;
    console.log(url);
    return this.http
      .delete(url, httpOptions)
      .pipe(map((response: Response) => response.json()));
  }
  putfitnessdata(id, data) {
    return this.http
      .put(UserService.BaseUrl + "allfriends/" + `${id}`, data, httpOptions)
      .pipe(map((response: Response) => response.json()));
  }
  postcontactdata(data){
    return this.http
      .post(UserService.BaseUrl + "contacts", data, httpOptions)
      .pipe(map((response: Response) => response.json()));
  }
}
