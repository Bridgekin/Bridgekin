import * as SiteTemplateApiUtil from '../util/site_template_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSiteTemplateErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SITE_TEMPLATE = 'RECEIVE_SITE_TEMPLATE';
export const REMOVE_SITE_TEMPLATE = "REMOVE_SITE_TEMPLATE";

export const receiveSiteTemplate = siteTemplate => ({
  type: RECEIVE_SITE_TEMPLATE,
  siteTemplate,
});

export const removeSiteTemplate = () => ({
  type: REMOVE_SITE_TEMPLATE,
});

export const fetchSiteTemplate = (networkId) => dispatch => (
  SiteTemplateApiUtil.fetchSiteTemplate(networkId)
    .then(handleErrors)
    .then(data => dispatch(receiveSiteTemplate(data.siteTemplate)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveSiteTemplateErrors(errors))
    })
);
