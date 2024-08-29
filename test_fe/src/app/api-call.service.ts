import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  apihost = 'api/';
  getService(methodName: string, params: any = null) {
    if (params) {
      let i = 0;
      let parmsdet = '';
      let paramvariable = '';
      // tslint:disable-next-line: forin
      for (const key in params) {
        paramvariable = '';
        if (i > 0) {
          paramvariable = '&' + key + '=' + params[key];
        } else {
          paramvariable = '?' + key + '=' + params[key];
        }
        parmsdet = parmsdet + paramvariable;
        i++;
      }

      return this.http.get<any>(`${environment.base_url}/` + this.apihost + methodName + parmsdet);
    } else {
      return this.http.get<any>(`${environment.base_url}/` + this.apihost + methodName+`/`);

    }
  }

  postservice(methodName: string, params: any = null) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    // JSON.stringify(data) 
    return this.http.post<any>(`${environment.base_url}/` + this.apihost + methodName, params, { headers: reqHeader });

  }


}
