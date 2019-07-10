export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const RECEIVE_WAITLIST_USER_ERRORS = 'RECEIVE_WAITLIST_USER_ERRORS';
export const CLEAR_WAITLIST_USER_ERRORS = 'CLEAR_WAITLIST_USER_ERRORS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';

export const RECEIVE_OPPORTUNITY_ERRORS = 'RECEIVE_OPPORTUNITY_ERRORS';
export const CLEAR_OPPORTUNITY_ERRORS = 'CLEAR_OPPORTUNITY_ERRORS';
export const RECEIVE_CONNECTED_OPPORTUNITY_ERRORS = 'RECEIVE_CONNECTED_OPPORTUNITY_ERRORS';
export const CLEAR_CONNECTED_OPPORTUNITY_ERRORS = 'CLEAR_CONNECTED_OPPORTUNITY_ERRORS';
export const RECEIVE_FINALIZED_OPPORTUNITY_ERRORS = 'RECEIVE_FINALIZED_OPPORTUNITY_ERRORS';
export const CLEAR_FINALIZED_OPPORTUNITY_ERRORS = 'CLEAR_FINALIZED_OPPORTUNITY_ERRORS';
export const RECEIVE_SAVED_OPPORTUNITY_ERRORS = 'RECEIVE_SAVED_OPPORTUNITY_ERRORS';
export const CLEAR_SAVED_OPPORTUNITY_ERRORS = 'CLEAR_SAVED_OPPORTUNITY_ERRORS';

export const RECEIVE_NETWORK_ERRORS = 'RECEIVE_NETWORK_ERRORS';
export const CLEAR_NETWORK_ERRORS = 'CLEAR_NETWORK_ERRORS';
export const RECEIVE_REFERRAL_ERRORS = 'RECEIVE_REFERRAL_ERRORS';
export const CLEAR_REFERRAL_ERRORS = 'CLEAR_REFERRAL_ERRORS';

export const RECEIVE_EMAIL_NOTIFICATION_ERRORS = 'RECEIVE_EMAIL_NOTIFICATION_ERRORS';
export const CLEAR_EMAIL_NOTIFICATION_ERRORS = 'CLEAR_EMAIL_NOTIFICATION_ERRORS';
export const RECEIVE_SITE_TEMPLATE_ERRORS = 'RECEIVE_SITE_TEMPLATE_ERRORS';
export const CLEAR_SITE_TEMPLATE_ERRORS = 'CLEAR_SITE_TEMPLATE_ERRORS';

export const RECEIVE_MANAGED_NETWORK_ERRORS = 'RECEIVE_MANAGED_NETWORK_ERRORS';
export const CLEAR_MANAGED_NETWORK_ERRORS = 'CLEAR_MANAGED_NETWORK_ERRORS';
export const RECEIVE_MEMBER_USER_ERRORS = 'RECEIVE_MEMBER_USER_ERRORS';
export const CLEAR_MEMBER_USER_ERRORS = 'CLEAR_MEMBER_USER_ERRORS';
export const RECEIVE_OPP_PERMISSION_ERRORS = 'RECEIVE_OPP_PERMISSION_ERRORS';
export const CLEAR_OPP_PERMISSION_ERRORS = 'CLEAR_OPP_PERMISSION_ERRORS';
export const RECEIVE_CONNECTION_ERRORS = 'RECEIVE_CONNECTION_ERRORS';
export const CLEAR_CONNECTION_ERRORS = 'CLEAR_CONNECTION_ERRORS';
export const RECEIVE_CIRCLE_ERRORS = 'RECEIVE_CIRCLE_ERRORS';
export const CLEAR_CIRCLE_ERRORS = 'CLEAR_CIRCLE_ERRORS';

export const RECEIVE_NOTIFICATION_SETTING_ERRORS = 'RECEIVE_NOTIFICATION_SETTING_ERRORS';
export const CLEAR_NOTIFICATION_SETTING_ERRORS = 'CLEAR_NOTIFICATION_SETTING_ERRORS';
export const RECEIVE_NOTIFICATION_ERRORS = 'RECEIVE_NOTIFICATION_ERRORS';
export const CLEAR_NOTIFICATION_ERRORS = 'CLEAR_NOTIFICATION_ERRORS';
export const RECEIVE_EMAIL_TEMPLATE_ERRORS = 'RECEIVE_EMAIL_TEMPLATE_ERRORS';
export const CLEAR_EMAIL_TEMPLATE_ERRORS = 'CLEAR_EMAIL_TEMPLATE_ERRORS';
export const RECEIVE_DIRECT_LINK_ERRORS = 'RECEIVE_DIRECT_LINK_ERRORS';
export const CLEAR_DIRECT_LINK_ERRORS = 'CLEAR_DIRECT_LINK_ERRORS';

export const RECEIVE_PASSED_OPPORTUNITY_ERRORS = 'RECEIVE_PASSED_OPPORTUNITY_ERRORS';
export const CLEAR_PASSED_OPPORTUNITY_ERRORS = 'CLEAR_PASSED_OPPORTUNITY_ERRORS';
export const RECEIVE_USER_METRIC_ERRORS = 'RECEIVE_USER_METRIC_ERRORS';
export const CLEAR_USER_METRIC_ERRORS = 'CLEAR_USER_METRIC_ERRORS';
export const RECEIVE_USER_FEATURE_ERRORS = 'RECEIVE_USER_FEATURE_ERRORS';
export const CLEAR_USER_FEATURE_ERRORS = 'CLEAR_USER_FEATURE_ERRORS';

export const RECEIVE_GOOGLE_IMPORT_ERRORS = 'RECEIVE_GOOGLE_IMPORT_ERRORS';
export const CLEAR_GOOGLE_IMPORT_ERRORS = 'CLEAR_GOOGLE_IMPORT_ERRORS';

export const RECEIVE_REF_OPP_ERRORS = 'RECEIVE_REF_OPP_ERRORS';
export const CLEAR_REF_OPP_ERRORS = 'CLEAR_REF_OPP_ERRORS';
export const RECEIVE_REF_APPLICATION_ERRORS = 'RECEIVE_REF_APPLICATION_ERRORS';
export const CLEAR_REF_APPLICATION_ERRORS = 'CLEAR_REF_APPLICATION_ERRORS';
export const RECEIVE_REF_LINK_ERRORS = 'RECEIVE_REF_LINK_ERRORS';
export const CLEAR_REF_LINK_ERRORS = 'CLEAR_REF_LINK_ERRORS';

export const RECEIVE_SALES_NETWORK_ERRORS = 'RECEIVE_SALES_NETWORK_ERRORS';
export const CLEAR_SALES_NETWORK_ERRORS = 'CLEAR_SALES_NETWORK_ERRORS';
export const RECEIVE_SALES_CONTACT_ERRORS = 'RECEIVE_SALES_CONTACT_ERRORS';
export const CLEAR_SALES_CONTACT_ERRORS = 'CLEAR_SALES_CONTACT_ERRORS';
export const RECEIVE_SALES_INTRO_ERRORS = 'RECEIVE_SALES_INTRO_ERRORS';
export const CLEAR_SALES_INTRO_ERRORS = 'CLEAR_SALES_INTRO_ERRORS';
export const RECEIVE_SALES_ADMIN_SIGNUP_ERRORS = 'RECEIVE_SALES_ADMIN_SIGNUP_ERRORS';
export const CLEAR_SALES_ADMIN_SIGNUP_ERRORS = 'CLEAR_SALES_ADMIN_SIGNUP_ERRORS';
export const RECEIVE_SALES_PRODUCT_ERRORS = 'RECEIVE_SALES_PRODUCT_ERRORS';
export const CLEAR_SALES_PRODUCT_ERRORS = 'CLEAR_SALES_PRODUCT_ERRORS';

export const RECEIVE_UTIL_ERRORS = 'RECEIVE_UTIL_ERRORS';
export const CLEAR_UTIL_ERRORS = 'CLEAR_UTIL_ERRORS';


export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const receiveWaitlistUserErrors = errors => ({
  type: RECEIVE_WAITLIST_USER_ERRORS,
  errors
});

export const clearWaitlistUserErrors = () => ({
  type: CLEAR_WAITLIST_USER_ERRORS,
});

export const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const clearUserErrors = () => ({
  type: CLEAR_USER_ERRORS,
});

export const receiveNetworkErrors = errors => ({
  type: RECEIVE_NETWORK_ERRORS,
  errors
});

export const clearNetworkErrors = () => ({
  type: CLEAR_NETWORK_ERRORS,
});

export const receiveOpportunityErrors = errors => ({
  type: RECEIVE_OPPORTUNITY_ERRORS,
  errors
});

export const clearOpportunityErrors = () => ({
  type: CLEAR_OPPORTUNITY_ERRORS,
});

export const receiveConnectedOpportunityErrors = errors => ({
  type: RECEIVE_CONNECTED_OPPORTUNITY_ERRORS,
  errors
});

export const clearConnectedOpportunityErrors = () => ({
  type: CLEAR_CONNECTED_OPPORTUNITY_ERRORS,
});

export const receiveFinalizedOpportunityErrors = errors => ({
  type: RECEIVE_FINALIZED_OPPORTUNITY_ERRORS,
  errors
});

export const clearFinalizedOpportunityErrors = () => ({
  type: CLEAR_FINALIZED_OPPORTUNITY_ERRORS,
});

export const receiveSavedOpportunityErrors = errors => ({
  type: RECEIVE_SAVED_OPPORTUNITY_ERRORS,
  errors
});

export const clearSavedOpportunityErrors = () => ({
  type: CLEAR_SAVED_OPPORTUNITY_ERRORS,
});

export const receiveReferralErrors = errors => ({
  type: RECEIVE_REFERRAL_ERRORS,
  errors
});

export const clearReferralErrors = () => ({
  type: CLEAR_REFERRAL_ERRORS,
});

export const receiveEmailNotificationErrors = errors => ({
  type: RECEIVE_EMAIL_NOTIFICATION_ERRORS,
  errors
});

export const clearEmailNotificationErrors = () => ({
  type: CLEAR_EMAIL_NOTIFICATION_ERRORS,
});

export const receiveSiteTemplateErrors = errors => ({
  type: RECEIVE_SITE_TEMPLATE_ERRORS,
  errors
});

export const clearSiteTemplateErrors = () => ({
  type: CLEAR_SITE_TEMPLATE_ERRORS,
});

export const receiveManagedNetworkErrors = errors => ({
  type: RECEIVE_MANAGED_NETWORK_ERRORS,
  errors
});

export const clearManagedNetworkErrors = () => ({
  type: CLEAR_MANAGED_NETWORK_ERRORS,
});

export const receiveMemberUserErrors = errors => ({
  type: RECEIVE_MEMBER_USER_ERRORS,
  errors
});

export const clearMemberUserErrors = () => ({
  type: CLEAR_MEMBER_USER_ERRORS,
});

export const receiveOppPermissionErrors = errors => ({
  type: RECEIVE_OPP_PERMISSION_ERRORS,
  errors
});

export const clearOppPermissionErrors = () => ({
  type: CLEAR_OPP_PERMISSION_ERRORS,
});

export const receiveConnectionErrors = errors => ({
  type: RECEIVE_CONNECTION_ERRORS,
  errors
});

export const clearConnectionErrors = () => ({
  type: CLEAR_CONNECTION_ERRORS,
});

export const receiveCircleErrors = errors => ({
  type: RECEIVE_CIRCLE_ERRORS,
  errors
});

export const clearCircleErrors = () => ({
  type: CLEAR_CIRCLE_ERRORS,
});

export const receiveNotificationSettingErrors = errors => ({
  type: RECEIVE_NOTIFICATION_SETTING_ERRORS,
  errors
});

export const clearNotificationSettingErrors = () => ({
  type: CLEAR_NOTIFICATION_SETTING_ERRORS,
});

export const receiveNotificationErrors = errors => ({
  type: RECEIVE_NOTIFICATION_ERRORS,
  errors
});

export const clearNotificationErrors = () => ({
  type: CLEAR_NOTIFICATION_ERRORS,
});

export const receiveEmailTemplateErrors = errors => ({
  type: RECEIVE_EMAIL_TEMPLATE_ERRORS,
  errors
});

export const clearEmailTemplateErrors = () => ({
  type: CLEAR_EMAIL_TEMPLATE_ERRORS,
});

export const receiveDirectLinkErrors = errors => ({
  type: RECEIVE_DIRECT_LINK_ERRORS,
  errors
});

export const clearDirectLinkErrors = () => ({
  type: CLEAR_DIRECT_LINK_ERRORS,
});

export const receivePassedOpportunityErrors = errors => ({
  type: RECEIVE_PASSED_OPPORTUNITY_ERRORS,
  errors
});

export const clearPassedOpportunityErrors = () => ({
  type: CLEAR_PASSED_OPPORTUNITY_ERRORS,
});

export const receiveUserMetricErrors = errors => ({
  type: RECEIVE_USER_METRIC_ERRORS,
  errors
});

export const clearUserMetricErrors = () => ({
  type: CLEAR_USER_METRIC_ERRORS,
});

export const receiveUserFeatureErrors = errors => ({
  type: RECEIVE_USER_FEATURE_ERRORS,
  errors
});

export const clearUserFeatureErrors = () => ({
  type: CLEAR_USER_FEATURE_ERRORS,
});

export const receiveGoogleImportErrors = errors => ({
  type: RECEIVE_GOOGLE_IMPORT_ERRORS,
  errors
});

export const clearGoogleImportErrors = () => ({
  type: CLEAR_GOOGLE_IMPORT_ERRORS,
});

export const receiveRefOppErrors = errors => ({
  type: RECEIVE_REF_OPP_ERRORS,
  errors
});

export const clearRefOppErrors = () => ({
  type: CLEAR_REF_OPP_ERRORS,
});

export const receiveRefApplicationErrors = errors => ({
  type: RECEIVE_REF_APPLICATION_ERRORS,
  errors
});

export const clearRefApplicationErrors = () => ({
  type: CLEAR_REF_APPLICATION_ERRORS,
});

export const receiveRefLinkErrors = errors => ({
  type: RECEIVE_REF_LINK_ERRORS,
  errors
});

export const clearRefLinkErrors = () => ({
  type: CLEAR_REF_LINK_ERRORS,
});

export const receiveSalesNetworkErrors = errors => ({
  type: RECEIVE_SALES_NETWORK_ERRORS,
  errors
});

export const clearSalesNetworkErrors = () => ({
  type: CLEAR_SALES_NETWORK_ERRORS,
});

export const receiveUtilErrors = errors => ({
  type: RECEIVE_UTIL_ERRORS,
  errors
});

export const clearUtilErrors = () => ({
  type: CLEAR_UTIL_ERRORS,
});

export const receiveSalesIntroErrors = errors => ({
  type: RECEIVE_SALES_INTRO_ERRORS,
  errors
});

export const clearSalesIntroErrors = () => ({
  type: CLEAR_SALES_INTRO_ERRORS,
});

export const receiveSalesContactErrors = errors => ({
  type: RECEIVE_SALES_CONTACT_ERRORS,
  errors
});

export const clearSalesContactErrors = () => ({
  type: CLEAR_SALES_CONTACT_ERRORS,
});

export const receiveSalesAdminSignupErrors = errors => ({
  type: RECEIVE_SALES_ADMIN_SIGNUP_ERRORS,
  errors
});

export const clearSalesAdminSignupErrors = () => ({
  type: CLEAR_SALES_ADMIN_SIGNUP_ERRORS,
});

export const receiveSalesProductErrors = errors => ({
  type: RECEIVE_SALES_PRODUCT_ERRORS,
  errors
});

export const clearSalesProductErrors = () => ({
  type: CLEAR_SALES_PRODUCT_ERRORS,
});