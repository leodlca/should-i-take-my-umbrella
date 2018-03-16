import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfigProvider } from '../server-config/server-config';

@Injectable()
export class CoreProvider {

  constructor(public http: HttpClient, private serverConfig: ServerConfigProvider) {
  }

  shouldI(address){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(`${this.serverConfig.getServerURI()}/v1/core/should-i/${address}`, 
      {headers: new HttpHeaders().set('Authorization', 'my-auth-token')})
      .toPromise()
      .then(
        res => resolve(res),
        err => reject(err)
      );

    });

  }

}
