import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfigProvider } from '../server-config/server-config';

@Injectable()
export class CoreProvider {

  constructor(public http: HttpClient, private serverConfig: ServerConfigProvider) {
  }

  addressShouldI(address, xHours) {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      this.http.get(`${this.serverConfig.getServerURI()}/v1/core/should-i-address/${address}/${xHours}`, 
      {headers: headers})
      .toPromise()
      .then(
        res => resolve(res),
        err => reject(err)
      );

    });

  }

  latlngShouldI(lat, lng, xHours) {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      this.http.get(`${this.serverConfig.getServerURI()}/v1/core/should-i-latlng/${lat}/${lng}/${xHours}`, 
      {headers: headers})
      .toPromise()
      .then(
        res => resolve(res),
        err => reject(err)
      );

    });

  }

}
