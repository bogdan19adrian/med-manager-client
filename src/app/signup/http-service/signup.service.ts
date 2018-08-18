import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../_helpers/app_settings';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(AppSettings.BACKEND_URL + '/api/auth/signup', data);
  }

  getAllRoles() {
    return this.http.get(AppSettings.BACKEND_URL + '/api/auth/getRoles');
  }
}
