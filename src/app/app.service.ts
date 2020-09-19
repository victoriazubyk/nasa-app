import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
  API_KEY = 'KDOO4Edhzs3Y3l2beMGuiyASkKy39Ta3jJrzIvAI';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getFotos(rover, camera, sol) {
    return this.http.get(`${this.API}${rover}/photos?sol=${sol}&camera=${camera}&api_key=${this.API_KEY}`).toPromise();
  }

}
