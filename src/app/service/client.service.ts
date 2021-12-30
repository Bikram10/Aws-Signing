import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {Constants} from "../sared/constants";

@Injectable()
export class ClientService{

  baseUrl: string = Constants.base_url;
  constructor(private httpClient: HttpClient) {
  }

  saveCourse(course: Course): Observable<Course>{
    return this.httpClient.post<Course>(this.baseUrl+"/buy", course);
  }
}
