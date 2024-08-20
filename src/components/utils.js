// utils.js
export function encodeEmail(email) {
    return email.replace('.', ',');
  }
  
  export function decodeEmail(encodedEmail) {
    return encodedEmail.replace(',', '.');
  }