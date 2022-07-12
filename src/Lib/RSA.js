import { JSEncrypt } from "jsencrypt";
import { PUBLICKEY } from "../env";

export class RSA{
    constructor(){
        this.publicKey = PUBLICKEY
        
    }
    Encrypt(){
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.publicKey);
    }
    Decrypt(){
        var decrypt = new JSEncrypt();   
        decrypt.setPrivateKey(privateKey);
    }
}