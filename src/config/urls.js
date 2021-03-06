/** Define URLs */

/** Backend system url */
export const BASE_URL = "http://35.188.32.151:8080";
export const GROUP_BASE_URL = "https://travel-group-service.wn.r.appspot.com/";
export const PLAN_BASE_URL = "https://travel-plan-service.wn.r.appspot.com/";

/** Entry points */
/** User-related service */
export const USER_SERVICE = BASE_URL + "/user/api/user";
export const LOGIN_URL = BASE_URL + "/login";
export const USER_BASIC_PROFILE_BY_USERID_URL =
  USER_SERVICE + "/profile/basic/";

/** Plan related service */
export const PLAN_SERVICE =
  "https://travel-plan-service.wn.r.appspot.com/v1/travelplan/";
export const NOTIFICATION_SERVICE = BASE_URL + "/notification/api/notification";
export const NOTIFICATION_WEBSOCKET_SERVICE =
  BASE_URL + "/notification-ws/notification";
export const BLOG_SERVICE = BASE_URL + "/user/api/blog";
export const UPLOAD_IMAGE_URL = BASE_URL + "/user";
export const GET_FINISHED_TRAVEL_PLANS_BY_USER_ID =
  PLAN_SERVICE + "read_finished/";
export const GET_A_SINGLE_PLAN_BY_ID = PLAN_SERVICE + "read/";

/** Group related service */
export const GROUP_SERVICE =
  "https://travel-group-service.wn.r.appspot.com/v1/travelgroup/";
export const GET_ALL_GROUPS_USER_BELONGS_BY_USERID =
  GROUP_SERVICE + "read/groups_in/";
/** google cloud storage */
export const GCS_URL =
  "https://storage.googleapis.com/travel-group-plan-image-bucket/";

/** Travel related service */
