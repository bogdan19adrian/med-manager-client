import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AppSettings} from '../_helpers/app_settings';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private perm: any;
    constructor(private http: HttpClient) { }
    login(username: string, password: string) {
        return this.http.post<any>(AppSettings.BACKEND_URL + '/api/auth/signin', { usernameOrEmail: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.accessToken) {
                  console.log(decode(user.accessToken));
                  this.perm = decode(user.accessToken).AUTHORITIES_KEY;
                  console.log(this.perm.split(','));
                  const permissions = this.perm.split(',');
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('permissions', permissions);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('permissions');
    }
}
