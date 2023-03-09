export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const SOCIAL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const WEBSITE_REGEX =
  /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/;
export const SHORTSITE_REGEX =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

export const MAX_LABEL_TYPE_LENGTH = 80;
export const MAX_LINK_LENGTH = 2500;

export const MAX_USERNAME_LENGTH = 36;
export const MIN_USERNAME_LENGTH = 2;

export const MAX_FULLNAME_LENGTH = 80;
export const MIN_FULLNAME_LENGTH = 3;

export const MAX_PROFILEBIO_LENGTH = 5000;

export const SESSION_KEY = "somescreteSTRING";

export const ROOM_QUERY_LIMIT = 5;
export const MESSAGE_QUERY_LIMIT = 10;

export const ALLOWED_COMPANY_TYPE = [
  "Healthcare Facility",
  "Agency",
  "Home Health",
  "Independent Practice",
  "Other",
];
