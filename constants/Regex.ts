/* eslint-disable no-useless-escape */
/*
 * username validation
 * accepted: letters & numbers, without space
 */
export const username = /^([a-zA-Z0-9\-_])*[^\s]\1*$/;
/*
 * email validation
 */
export const email = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

export const number = /[0-9]|\./;

export const phone =
  /^(?:\+\d{1,2}\s*)?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{8,}: at least 8 from the mentioned characters
 * (?=.*[!@#$%^&*]): at least one special characters
 */
export const password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
