import * as CircleApiUtil from '../util/circles_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveCircleErrors } from './error_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_CIRCLE_MEMBER_SETS = 'RECEIVE_CIRCLE_MEMBER_SETS';
export const RECEIVE_CIRCLE_MEMBER_SET = 'RECEIVE_CIRCLE_MEMBER_SET';
export const REMOVE_CIRCLE_MEMBER_SET = 'REMOVE_CIRCLE_MEMBER_SET';
export const RECEIVE_CIRCLES = 'RECEIVE_CIRCLES';
export const RECEIVE_CIRCLE = 'RECEIVE_CIRCLE';
export const REMOVE_CIRCLE = "REMOVE_CIRCLE";

export const receiveCircleMemberSets = circleMemberSets => ({
  type: RECEIVE_CIRCLE_MEMBER_SETS,
  circleMemberSets,
});

export const receiveCircleMemberSet = (circleMembers, circleId) => ({
  type: RECEIVE_CIRCLE_MEMBER_SET,
  circleMembers, circleId
});

export const removeCircleMemberSet = circleId => ({
  type: REMOVE_CIRCLE_MEMBER_SET,
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
      dispatch(receiveCircleMemberSet(data.circleMemberIds, circleId));
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
      dispatch(receiveCircleMemberSet(data.circleMemberIds, circleId));
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
      dispatch(receiveCircleMemberSets(data.circleMemberIds));
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
      dispatch(receiveCircleMemberSet(data.circleMemberIds));
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
      dispatch(receiveCircleMemberSet(data.circleMemberIds, data.circle.id));
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
      dispatch(receiveCircleMemberSet(data.circleMemberIds, data.circle.id));
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
      dispatch(removeCircleMemberSet(id));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveCircleErrors(errors))
    })
);
