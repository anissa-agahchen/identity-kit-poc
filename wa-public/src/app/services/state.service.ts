import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

export interface IUser {
  _id?: string;
  guid?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IValidateLink {
  _id: string;
  expired: boolean;
  active: boolean;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _isAuth = false;
  private _title = 'Identity Kit POC';

  get linkId() {
    return localStorage.getItem('linkId');
  }

  get _id() {
    return localStorage.getItem('id');
  }

  set _id(id: string) {
    localStorage.setItem('id', id);
  }

  get email(): string {
    return localStorage.getItem('email') || '';
  }

  user: IUser;
  private _apiUrl: string;

  isValidToken(token: string): Observable<IValidateLink> {
    const url = `${this._apiUrl}/invitations/${token}/validate`;
    localStorage.setItem('linkId', token);
    return this.http.get<IValidateLink>(url);
  }

  get isAuth() {
    return this._isAuth;
  }

  get title() {
    return this._title;
  }

  constructor(private http: HttpClient) {
    this._apiUrl = AppConfigService.settings.apiServer.url;
  }
}
