import CryptoJS from "crypto-js";
import { key } from "../env";
// // console.log("haha;",key)
export function decrypt(param) {
  console.log("param:", param);
  const decodedWord = CryptoJS.enc.Base64.parse(param);
  console.log("decodeWord:", decodedWord);
  const decoded = CryptoJS.enc.Utf8.stringify(decodedWord.words);
  console.log("decode:",decoded);
  let plaintext = CryptoJS.TripleDES.decrypt(decoded, key);
  return plaintext.toString(CryptoJS.enc.Utf8);
}

// export function decrypt(param) {
//     const decodedWord = CryptoJS.enc.Base64.parse(param);
//     const decoded = CryptoJS.enc.Utf8.stringify(decodedWord);
//     let plaintext = CryptoJS.TripleDES.decrypt(decoded, key);
//     console.log("plaintext:",plaintext)
//     return plaintext.toString(CryptoJS.enc.Utf8);
//   };