import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerConfigProvider {

  private serverURI:string = 'http://192.168.0.111:3000';

  constructor(public http: HttpClient) {
  }

  getServerURI() {
    return this.serverURI;
  }

}
