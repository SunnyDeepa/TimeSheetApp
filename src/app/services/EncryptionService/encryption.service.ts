import { Injectable } from '@angular/core';
// @ts-ignore
import { JSDataEncryption } from '../../../assets/js_cust/cust.dataencryption.js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey: string =environment.EncvKey

  constructor() { }  
  async encryptData(data:any) {
    let JSDataEncryptionObj = new JSDataEncryption();
    let mReplaced = await JSDataEncryptionObj.Encrypt(data, this.secretKey);
    if (mReplaced.includes("+")) {
      mReplaced = await this.tools_replaceAll(mReplaced, "+", "~");
    }
    return await mReplaced
  }

  async decryptData(data:any) {
    let mReplaced = data
    if (data.includes("~")) {
      mReplaced = await this.tools_replaceAll(data, "~", "+");
    }
    let JSDataDecryptionObj = new JSDataEncryption();
    return await JSDataDecryptionObj.Decrypt(mReplaced, this.secretKey);
  }
  async tools_replaceAll(str:any, find:any, replace:any) {
    return await str.replace(new RegExp(await this.escapeRegExp(find), 'g'), replace);;
  }
  async escapeRegExp(string:any) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  async encryptDatatiled(data:any) {

    let JSDataEncryptionObj = new JSDataEncryption();
    let mReplaced = await JSDataEncryptionObj.Encrypt(data, this.secretKey);
    if (mReplaced.includes("+")) {
      mReplaced = await this.tools_replaceAll(mReplaced, "+", "~");
    }
    return await mReplaced
  }
}
