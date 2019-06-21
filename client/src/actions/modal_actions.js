// INVITE MODAL
export const OPEN_INVITE_MODAL = 'OPEN_INVITE_MODAL';
export const CLOSE_INVITE_MODAL = "CLOSE_INVITE_MODAL";

export const openInvite = userId => ({
  type: OPEN_INVITE_MODAL,
  userId,
});

export const closeInvite = () => ({
  type: CLOSE_INVITE_MODAL,
});

// CREATE CIRCLE MODAL
export const OPEN_CREATE_CIRCLE_MODAL = 'OPEN_CREATE_CIRCLE_MODAL';
export const CLOSE_CREATE_CIRCLE_MODAL = "CLOSE_CREATE_CIRCLE_MODAL";

export const openCreateCircle = () => ({
  type: OPEN_CREATE_CIRCLE_MODAL
});

export const closeCreateCircle = () => ({
  type: CLOSE_CREATE_CIRCLE_MODAL,
});

// CIRCLE MODAL
export const OPEN_CIRCLE_MODAL = 'OPEN_CIRCLE_MODAL';
export const CLOSE_CIRCLE_MODAL = "CLOSE_CIRCLE_MODAL";

export const openCircle = circleId => ({
  type: OPEN_CIRCLE_MODAL,
  circleId,
});

export const closeCircle = () => ({
  type: CLOSE_CIRCLE_MODAL,
});

// CUSTOM EMAIL MODAL
export const OPEN_CUSTOM_EMAIL_MODAL = 'OPEN_CUSTOM_EMAIL_MODAL';
export const OPEN_CUSTOM_EMAIL_OPP_CARD_MODAL = 'OPEN_CUSTOM_EMAIL_OPP_CARD_MODAL';
export const OPEN_CUSTOM_EMAIL_WAITLIST_REFERRAL_MODAL = 'OPEN_CUSTOM_EMAIL_WAITLIST_REFERRAL_MODAL';
export const CLOSE_CUSTOM_EMAIL_MODAL = "CLOSE_CUSTOM_EMAIL_MODAL";

export const openCustomEmail = (templateType) => ({
  type: OPEN_CUSTOM_EMAIL_MODAL,
  templateType
});

export const openCustomEmailWaitlistReferral = (templateType, email, fname) => ({
  type: OPEN_CUSTOM_EMAIL_WAITLIST_REFERRAL_MODAL,
  templateType, email, fname
});

export const openCustomEmailOppCard = (templateType, connectBool, oppId) => ({
  type: OPEN_CUSTOM_EMAIL_OPP_CARD_MODAL,
  templateType, connectBool, oppId
});

export const closeCustomEmail = () => ({
  type: CLOSE_CUSTOM_EMAIL_MODAL,
});

// WAITLIST MODAL
export const OPEN_WAITLIST_MODAL = 'OPEN_WAITLIST_MODAL';
export const CLOSE_WAITLIST_MODAL = "CLOSE_WAITLIST_MODAL";

export const openWaitlist = (referred) => ({
  type: OPEN_WAITLIST_MODAL,
  referred: (!!referred)
});

export const closeWaitlist = () => ({
  type: CLOSE_WAITLIST_MODAL,
});

// OPPORTUNITY CARD MODAL
export const OPEN_OPP_CARD_MODAL = 'OPEN_OPP_CARD_MODAL';
export const CLOSE_OPP_CARD_MODAL = "CLOSE_OPP_CARD_MODAL";

export const openOppCard = payload => ({
  type: OPEN_OPP_CARD_MODAL,
  payload
});

export const closeOppCard = () => ({
  type: CLOSE_OPP_CARD_MODAL,
});

// UPDATE USER MODAL
export const OPEN_UPDATE_USER_MODAL = 'OPEN_UPDATE_USER_MODAL';
export const CLOSE_UPDATE_USER_MODAL = "CLOSE_UPDATE_USER_MODAL";

export const openUpdateUser = (settingsType) => ({
  type: OPEN_UPDATE_USER_MODAL,
  settingsType
});

export const closeUpdateUser = () => ({
  type: CLOSE_UPDATE_USER_MODAL,
});

// DIRECT LINK MODAL
export const OPEN_DIRECT_LINK_MODAL = 'OPEN_DIRECT_LINK_MODAL';
export const CLOSE_DIRECT_LINK_MODAL = "CLOSE_DIRECT_LINK_MODAL";

export const openDirectLink = () => ({
  type: OPEN_DIRECT_LINK_MODAL
});

export const closeDirectLink = () => ({
  type: CLOSE_DIRECT_LINK_MODAL,
});

// OPPORTUNITY CHANGE MODAL
export const OPEN_OPP_CHANGE_MODAL = 'OPEN_OPP_CHANGE_MODAL';
export const CLOSE_OPP_CHANGE_MODAL = "CLOSE_OPP_CHANGE_MODAL";

export const openOppChange = (payload) => ({
  type: OPEN_OPP_CHANGE_MODAL,
  payload
});

export const closeOppChange = () => ({
  type: CLOSE_OPP_CHANGE_MODAL,
});

// Image Crop Modal
export const OPEN_IMAGE_CROP_MODAL = 'OPEN_IMAGE_CROP_MODAL';
export const CLOSE_IMAGE_CROP_MODAL = "CLOSE_IMAGE_CROP_MODAL";

export const openImageCrop = (payload) => ({
  type: OPEN_IMAGE_CROP_MODAL,
  payload
});

export const closeImageCrop = () => ({
  type: CLOSE_IMAGE_CROP_MODAL,
});

// Submit Opportunity Modal
export const OPEN_SUBMIT_OPP_MODAL = 'OPEN_SUBMIT_OPP_MODAL';
export const CLOSE_SUBMIT_OPP_MODAL = "CLOSE_SUBMIT_OPP_MODAL";

export const openSubmitOpp = (payload) => ({
  type: OPEN_SUBMIT_OPP_MODAL,
  payload
});

export const closeSubmitOpp = () => ({
  type: CLOSE_SUBMIT_OPP_MODAL,
});

// Delete Opportunity Modal
export const OPEN_DELETE_OPP_MODAL = 'OPEN_DELETE_OPP_MODAL';
export const CLOSE_DELETE_OPP_MODAL = "CLOSE_DELETE_OPP_MODAL";

export const openDeleteOpp = (payload) => ({
  type: OPEN_DELETE_OPP_MODAL,
  payload
});

export const closeDeleteOpp = () => ({
  type: CLOSE_DELETE_OPP_MODAL,
});

// Open External Invite Modal
export const OPEN_EXTERNAL_INVITE_MODAL = 'OPEN_EXTERNAL_INVITE_MODAL';
export const CLOSE_EXTERNAL_INVITE_MODAL = "CLOSE_EXTERNAL_INVITE_MODAL";

export const openExternalInvite = email => ({
  type: OPEN_EXTERNAL_INVITE_MODAL,
  email
});

export const closeExternalInvite = () => ({
  type: CLOSE_EXTERNAL_INVITE_MODAL,
});

// Open Signup Errors Modal
export const OPEN_SIGNUP_MODAL = 'OPEN_SIGNUP_MODAL';
export const CLOSE_SIGNUP_MODAL = "CLOSE_SIGNUP_MODAL";

export const openSignup = (payload) => ({
  type: OPEN_SIGNUP_MODAL,
  payload
});

export const closeSignup = () => ({
  type: CLOSE_SIGNUP_MODAL,
});

// Open Login Modal
export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";

export const openLogin = (payload) => ({
  type: OPEN_LOGIN_MODAL,
  payload
});

export const closeLogin = () => ({
  type: CLOSE_LOGIN_MODAL,
});

// Open Ref Application
export const OPEN_REF_APPLICATION_MODAL = 'OPEN_REF_APPLICATION_MODAL';
export const CLOSE_REF_APPLICATION_MODAL = "CLOSE_REF_APPLICATION_MODAL";

export const openRefAppModal = (payload) => ({
  type: OPEN_REF_APPLICATION_MODAL,
  payload
});

export const closeRefApplication = () => ({
  type: CLOSE_REF_APPLICATION_MODAL,
});

// Open Ref App Status
export const OPEN_REF_APP_STATUS_MODAL = 'OPEN_REF_APP_STATUS_MODAL';
export const CLOSE_REF_APP_STATUS_MODAL = "CLOSE_REF_APP_STATUS_MODAL";

export const openRefAppStatus = (payload) => ({
  type: OPEN_REF_APP_STATUS_MODAL,
  payload
});

export const closeRefAppStatus = () => ({
  type: CLOSE_REF_APP_STATUS_MODAL,
});

// Open Request Warm Intro
export const OPEN_REQUEST_INTRO_MODAL = 'OPEN_REQUEST_INTRO_MODAL';
export const CLOSE_REQUEST_INTRO_MODAL = "CLOSE_REQUEST_INTRO_MODAL";

export const openRequestIntro = (payload) => ({
  type: OPEN_REQUEST_INTRO_MODAL,
  payload
});

export const closeRequestIntro = () => ({
  type: CLOSE_REQUEST_INTRO_MODAL,
});


// Open Connect Social
export const OPEN_CONNECT_SOCIAL_MODAL = 'OPEN_CONNECT_SOCIAL_MODAL';
export const CLOSE_CONNECT_SOCIAL_MODAL = "CLOSE_CONNECT_SOCIAL_MODAL";

export const openConnectSocial = (payload) => ({
  type: OPEN_CONNECT_SOCIAL_MODAL,
  payload
});

export const closeConnectSocial = () => ({
  type: CLOSE_CONNECT_SOCIAL_MODAL,
});

// Open Resoond To Request
export const OPEN_REQUEST_TO_REQUEST_MODAL = 'OPEN_REQUEST_TO_REQUEST_MODAL';
export const CLOSE_REQUEST_TO_REQUEST_MODAL = "CLOSE_REQUEST_TO_REQUEST_MODAL";

export const openRespondToRequest = (payload) => ({
  type: OPEN_REQUEST_TO_REQUEST_MODAL,
  payload
});

export const closeRespondToRequest = () => ({
  type: CLOSE_REQUEST_TO_REQUEST_MODAL,
});
