import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {AppSettings} from "../_helpers/app_settings";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    findAll() {
        return this.http.get(AppSettings.BACKEND_URL + '/users/findAll');
    }
}