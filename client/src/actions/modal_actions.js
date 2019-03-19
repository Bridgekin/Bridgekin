export const OPEN_INVITE_MODAL = 'OPEN_INVITE_MODAL';
export const CLOSE_INVITE_MODAL = "CLOSE_INVITE_MODAL";

export const openInvite = userId => ({
  type: OPEN_INVITE_MODAL,
  userId,
});

export const closeInvite = () => ({
  type: CLOSE_INVITE_MODAL,
});

export const OPEN_CREATE_CIRCLE_MODAL = 'OPEN_CREATE_CIRCLE_MODAL';
export const CLOSE_CREATE_CIRCLE_MODAL = "CLOSE_CREATE_CIRCLE_MODAL";

export const openCreateCircle = () => ({
  type: OPEN_CREATE_CIRCLE_MODAL
});

export const closeCreateCircle = () => ({
  type: CLOSE_CREATE_CIRCLE_MODAL,
});

export const OPEN_CIRCLE_MODAL = 'OPEN_CIRCLE_MODAL';
export const CLOSE_CIRCLE_MODAL = "CLOSE_CIRCLE_MODAL";

export const openCircle = circleId => ({
  type: OPEN_CIRCLE_MODAL,
  circleId,
});

export const closeCircle = () => ({
  type: CLOSE_CIRCLE_MODAL,
});
