import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../_helpers/app_settings';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    findAll() {
        return this.http.get(AppSettings.BACKEND_URL + '/users/findAll');
    }

  getUserPermissions() {
    return this.http.get(AppSettings.BACKEND_URL + '/api/auth/getUserPermissions');
  }

  updateUser(event: any) {
      return this.http.put(AppSettings.BACKEND_URL + '/users/updateUser', event);

  }

  deleteUser(id: any) {
    return this.http.delete(AppSettings.BACKEND_URL + '/users/deleteUser/' + id);
  }
}
