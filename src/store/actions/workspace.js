import {define} from "../../helpers/redux-request";
import Api from "../../Api";

export const CREATE_WORKSPACE = define('CREATE_WORKSPACE');

export function createWorkspaceRequest(requestData) {
    return CREATE_WORKSPACE.request(() => Api.createWorkspace(requestData));
}

export const GET_WORKSPACES = define('GET_WORKSPACES');

export function getWorkspacesRequest(userId) {
    return GET_WORKSPACES.request(() => Api.getWorkspace(userId));
}