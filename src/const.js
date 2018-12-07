// WordPress REST API Urls
export const WP_ROOT = "http://betheltownship.net/wp/";
export const ROOT_API_URL = "http://betheltownship.net/wp/wp-json/wp/v2";
export const PAGES_API_URL = `${ROOT_API_URL}/pages/?slug=`;
export const POSTS_API_URL = `${ROOT_API_URL}/posts/?`;
export const MEDIA_API_URL = `${ROOT_API_URL}/media/?parent=`;
export const FEATURED_MEDIA_API_URL = `${ROOT_API_URL}/media/`;
export const ROOT_MENU_URL = `${ROOT_API_URL}/pages/?context=embed&orderby=menu_order&parent=0`;
export const SECONDARY_MENU_URL = `${ROOT_API_URL}/pages/?context=embed&orderby=menu_order&parent=`;

// Google Calendar API settings
export const API_KEY = "AIzaSyASEAVn4eRhFpHbbK3bAjYHLOc5r1Yb5i0";
export const CALENDAR_ID = "styer.park@gmail.com";

// POST date range for display
var date = new Date(Date.now());
date = new Date(date.setDate(date.getDate() - 30));
export const POSTS_DATE_RANGE = date.toISOString();
