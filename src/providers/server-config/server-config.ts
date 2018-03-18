import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerConfigProvider {

  private serverURI:string = 'https://should-i-take-my-umbrella-api.herokuapp.com';
  //private serverURI:string = 'https://localhost:3000';

  constructor(public http: HttpClient) {
  }

  getServerURI() {
    return this.serverURI;
  }

}
  