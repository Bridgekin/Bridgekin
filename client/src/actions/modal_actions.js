export const OPEN_INVITE_MODAL = 'OPEN_INVITE_MODAL';
export const CLOSE_INVITE_MODAL = "CLOSE_INVITE_MODAL";

export const openInvite = userId => ({
  type: OPEN_INVITE_MODAL,
  userId,
});

export const closeInvite = () => ({
  type: CLOSE_INVITE_MODAL,
});
