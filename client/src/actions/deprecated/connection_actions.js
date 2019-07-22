import * as ConnectionApiUtil from '../../util/deprecated/connections_api_util';
import { handleErrors } from '../fetch_error_handler';
import { receiveConnectionErrors } from '../error_actions';
import { receiveUsers } from '../user_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_CONNECTIONS = 'RECEIVE_CONNECTIONS';
export const RECEIVE_CONNECTION = 'RECEIVE_CONNECTION';
export const REMOVE_CONNECTION = "REMOVE_CONNECTION";

export const receiveConnections = connections => ({
  type: RECEIVE_CONNECTIONS,
  connections,
});

export const receiveConnection = connection => ({
  type: RECEIVE_CONNECTION,
  connection,
});

export const removeConnection = connectionId => ({
  type: REMOVE_CONNECTION,
  connectionId
});

export const fetchConnections = () => dispatch => (
  ConnectionApiUtil.fetchConnections()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveConnections(data.connections));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveConnectionErrors(errors))
    })
);

export const fetchConnection = (id) => dispatch => (
  ConnectionApiUtil.fetchConnection()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveConnection(data.connection));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveConnectionErrors(errors))
    })
);

export const createConnection = (connection) => dispatch => (
  ConnectionApiUtil.createConnection(connection)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveConnection(data.connection));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveConnectionErrors(errors))
    })
);

export const updateConnection = (connection) => dispatch => (
  ConnectionApiUtil.updateConnection(connection)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveConnection(data.connection));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveConnectionErrors(errors))
    })
);


export const deleteConnection = (id) => dispatch => (
  ConnectionApiUtil.deleteConnection(id)
    .then(handleErrors)
    .then(data => dispatch(removeConnection(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveConnectionErrors(errors))
    })
);
