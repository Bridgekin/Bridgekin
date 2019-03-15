import * as CircleApiUtil from '../util/circles_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveCircleErrors } from './error_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_CIRCLE_MEMBERS = 'RECEIVE_CIRCLE_MEMBERS';
export const REMOVE_CIRCLE_MEMBERS = 'REMOVE_CIRCLE_MEMBERS';
export const RECEIVE_CIRCLES = 'RECEIVE_CIRCLES';
export const RECEIVE_CIRCLE = 'RECEIVE_CIRCLE';
export const REMOVE_CIRCLE = "REMOVE_CIRCLE";

export const receiveCircleMembers = circleMembers => ({
  type: RECEIVE_CIRCLE_MEMBERS,
  circleMembers,
});

export const removeCircleMembers = circleId => ({
  type: REMOVE_CIRCLE_MEMBERS,
  circleId,
});

export const receiveCircles = circles => ({
  type: RECEIVE_CIRCLES,
  circles,
});

export const receiveCircle = circle => ({
  type: RECEIVE_CIRCLE,
  circle,
});

export const removeCircle = circleId => ({
  type: REMOVE_CIRCLE,
  circleId
});

export const addMember = (circleId, memberId) => dispatch => (
  CircleApiUtil.addMember(circleId, memberId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveCircleMembers(data.circleMemberIds));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);

export const removeMember = (circleId, memberId) => dispatch => (
  CircleApiUtil.removeMember(circleId, memberId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveCircleMembers(data.circleMemberIds));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);

export const fetchCircles = () => dispatch => (
  CircleApiUtil.fetchCircles()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveCircles(data.circles));
      dispatch(receiveCircleMembers(data.circleMemberIds));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);

export const fetchCircle = (id) => dispatch => (
  CircleApiUtil.fetchCircle()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveCircle(data.circle));
      dispatch(receiveCircleMembers(data.circleMemberIds));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);

export const createCircle = (circle) => dispatch => (
  CircleApiUtil.createCircle(circle)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveCircle(data.circle));
      dispatch(receiveCircleMembers(data.circleMemberIds));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);

export const updateCircle = (circle) => dispatch => (
  CircleApiUtil.updateCircle(circle)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveCircle(data.circle));
      dispatch(receiveCircleMembers(data.circleMemberIds));
      dispatch(receiveUsers(data.users));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);


export const deleteCircle = (id) => dispatch => (
  CircleApiUtil.deleteCircle(id)
    .then(handleErrors)
    .then(data => {
      dispatch(removeCircle(id));
      dispatch(removeCircleMembers(id));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);
