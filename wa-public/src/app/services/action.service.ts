import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { IInvitationRecord } from '../interfaces/invitation-record';
import { AppConfigService } from './app-config.service';
import { StateService } from './state.service';
import { ConfigurationProvider } from 'angular-auth-oidc-client/lib/services/auth-configuration.provider';
import { Router } from '@angular/router';

export interface IInvitation {
  connection_id: string;
  invitation: Invitation;
  invitation_url: string;
  base64: string;
}
export interface Invitation {
  '@type': string;
  '@id': string;
  serviceEndpoint: string;
  recipientKeys?: string[] | null;
  label: string;
}

export interface IConnectionResponse {
  invitation_mode: string;
  state: string;
  invitation_key: string;
  accept: string;
  routing_state: string;
  created_at: string;
  updated_at: string;
  connection_id: string;
  initiator: string;
}

export interface IssueCredential {
  claims: Claims;
  connectionId: string;
  _id: string;
}
export interface Claims {
  userdisplayname: string;
  email: string;
  surname: string;
  givenname: string;
  birthdate: string;
  streetaddress: string;
  locality: string;
  stateorprovince: string;
  postalcode: string;
  country: string;
}

export interface IssueResponse {
  created_at: string;
  credential_proposal_dict: CredentialProposalDict;
  credential_definition_id: string;
  connection_id: string;
  state: string;
  auto_issue: boolean;
  updated_at: string;
  thread_id: string;
  schema_id: string;
  auto_offer: boolean;
  credential_exchange_id: string;
  credential_offer: CredentialOffer;
  initiator: string;
}
export interface CredentialProposalDict {
  '@type': string;
  '@id': string;
  cred_def_id: string;
  credential_proposal: CredentialProposal;
  comment: string;
}
export interface CredentialProposal {
  '@type': string;
  attributes?: AttributesEntity[] | null;
}
export interface AttributesEntity {
  name: string;
  value: string;
}
export interface CredentialOffer {
  schema_id: string;
  cred_def_id: string;
  key_correctness_proof: KeyCorrectnessProof;
  nonce: string;
}
export interface KeyCorrectnessProof {
  c: string;
  xz_cap: string;
  xr_cap?: (string[] | null)[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  _apiUrl: string;

  set email(addr: string) {
    localStorage.setItem('email', addr);
  }

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
    private stateSvc: StateService,
    private http: HttpClient,
  ) {
    this._apiUrl = AppConfigService.settings.apiServer.url;
    this.oidcSecurityService.getUserData().subscribe((userData: any) => {
      this.stateSvc.user = userData;
    });
  }

  async logout(url?: string) {
    await this.oidcSecurityService.logoff();
    if (url) {
      return this.router.navigateByUrl(url);
    }
  }

  getInvitation() {
    return this.http.get<IInvitation>(`${this._apiUrl}/connections`);
  }

  getConnectionState(id: string) {
    return this.http.get<IConnectionResponse>(
      `${this._apiUrl}/connections/${id}`,
    );
  }

  issueCredentials(data: IssueCredential) {
    console.log('issue data', data);
    return this.http.post<IssueResponse>(`${this._apiUrl}/issues/`, data);
  }

  getCredentialById(id: string) {
    return this.http.get<IInvitationRecord>(`${this._apiUrl}/issues/${id}`);
  }

  requestRenewal(args: { email: string; id: string }) {
    const { email, id } = args;
    return this.http.post<any>(`${this._apiUrl}/invitations/${id}/request`, {
      email,
    });
  }
}
