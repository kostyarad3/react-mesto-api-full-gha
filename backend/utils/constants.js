// eslint-disable-next-line no-useless-escape
const LINK_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { BASE_URL } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  LINK_REGEX,
  BASE_URL,
};
