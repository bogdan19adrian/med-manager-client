import { Injectable } from '@angular/core';
import {AuthGroup} from './auth-group';
import {HttpClient} from '@angular/common/http';
import {reject} from 'q';

@Injectable()
export class AuthorizationService {

  permissions: Array<string>; // Store the actions for which this user has permission

  constructor(private http: HttpClient) { }

  hasPermission(authGroup: AuthGroup) {
    if (this.permissions && this.permissions.find(permission => {
      return permission === authGroup;
    })) {
      return true;
    }
    return false;
  }
  initializePermissions() {
    return new Promise((resolve) => {
      // Call API to retrieve the list of actions this user is permitted to perform.
      // In this case, the method returns a Promise, but it could have been implemented as an Observable
      const perms = localStorage.getItem('permissions');
      const permissions = perms.split(',');
          this.permissions = permissions;
          console.log(this.permissions)
          resolve();

    });
  }

}
