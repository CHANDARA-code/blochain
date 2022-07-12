import CryptoJS from "crypto-js";
import { IV, KEY } from "../env";
export class AES {
  constructor() {
    this.keyWA = CryptoJS.enc.Utf8.parse(KEY);
    this.ivWA = CryptoJS.enc.Utf8.parse(IV);
  }

  decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.keyWA, {
      iv: this.ivWA,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  encrypt(param) {
    let data = CryptoJS.AES.encrypt(param, this.keyWA, {
      iv: this.ivWA,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return data.toString();
  }
}
