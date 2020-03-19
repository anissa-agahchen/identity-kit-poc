import { IssuerInvitationInterface } from "@/models/api";
import { Invitation, InvitationStatus } from "@/models/invitation";
import { InvitationState, RootState } from "@/models/storeState";
import config from "appConfig";
import Axios from "axios";
import { Route } from "vue-router";
import { ActionContext, ActionTree } from "vuex";

function getInviteStatus(inviteData: {
  active: boolean;
  expired: boolean;
}): InvitationStatus {
  let status;
  if (inviteData.active && !inviteData.expired) {
    status = InvitationStatus.VALID;
  } else if (inviteData.expired) {
    status = InvitationStatus.EXPIRED;
  }
  return status || InvitationStatus.UNDEFINED;
}

export const actions: ActionTree<InvitationState, RootState> = {
  isValidToken(
    context: ActionContext<InvitationState, RootState>,
    route: Route
  ) {
    return new Promise<boolean>(resolve => {
      let isValid = false;
      const token = route.query.invite_token as string;
      const invitation = new Invitation();

      if (!token) {
        // no token was provided
        invitation.status = InvitationStatus.INVALID;
        context.commit("setStatus", InvitationStatus.INVALID);
        resolve(false);
      } else {
        // check token validity
        Axios.get(`${config.apiServer.url}/invitations/${token}/validate`).then(
          response => {
            const responseData = response.data as IssuerInvitationInterface;
            const invitationStatus = getInviteStatus({
              active: responseData.active,
              expired: responseData.expired
            });
            invitation.status = invitationStatus;
            if (InvitationStatus.VALID === invitationStatus) {
              invitation.token = token;
              invitation.data = responseData.data;
              isValid = true;
              // Store invitation in browser, so we can use it after IdP authentication
              localStorage.setItem(
                "issuer-invitation",
                JSON.stringify(invitation)
              );
            } else {
              isValid = false;
            }
            context.commit("setInvitation", invitation);
            resolve(isValid);
          }
        );
      }
    });
  }
};
