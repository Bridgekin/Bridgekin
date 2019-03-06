// import * as SiteTemplateApiUtil from '../util/site_template_api_util';
// import { handleErrors } from './fetch_error_handler';
// import { receiveSiteTemplateErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_WORKSPACES = 'RECEIVE_WORKSPACES';
export const REMOVE_WORKSPACE = "REMOVE_WORKSPACE";

export const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces,
});

export const removeWorkspace = () => ({
  type: REMOVE_WORKSPACE,
});

export const RECEIVE_WORKSPACE_OPTIONS = 'RECEIVE_WORKSPACE_OPTIONS';
export const RECEIVE_WORKSPACE_OPTION = 'RECEIVE_WORKSPACE_OPTION';
export const REMOVE_WORKSPACE_OPTION = "REMOVE_WORKSPACE_OPTION";

export const receiveWorkspaceOptions = workspaceOptionIds => ({
  type: RECEIVE_WORKSPACE_OPTIONS,
  workspaceOptionIds,
});

export const receiveWorkspaceOptionId = workspaceOptionId => ({
  type: RECEIVE_WORKSPACE_OPTION,
  workspaceOptionId,
});

export const removeWorkspaceOptionId = workspaceOptionId => ({
  type: REMOVE_WORKSPACE_OPTION,
  workspaceOptionId
});
