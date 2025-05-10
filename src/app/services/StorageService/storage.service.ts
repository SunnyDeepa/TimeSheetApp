import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../EncryptionService/encryption.service';
// import { LoggerService } from '../LoggerService/logger.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // private loggerService:LoggerService
  private Enablecrypto = environment.Enablecrypto

  constructor(private storage: Storage, private encyption: EncryptionService) {
    this.storage.create();
  }

  async set(key: string, value: any): Promise<any> {
    try {
      if (this.Enablecrypto) {
        const result = await this.storage.set(key, await this.encyption.encryptData(value));
        console.log('set string in storage: ' + result);
        return true;
      } else {
        const result = await this.storage.set(key, value);
        console.log('set string in storage: ' + result);
        return true;
      }

    } catch (reason) {
      console.log(reason);
      // this.loggerService.errorLog(reason)
      return false;
    }
  }
  // to get a key/value pair
  async get(key: string): Promise<any> {
    try {
      if (this.Enablecrypto) {
        const result = await this.storage.get(key);
        if (result != null) {
          return await this.encyption.decryptData(result);
        }
      } else {
        const result = await this.storage.get(key);
        if (result != null) {
          return result;
        }
      }
      return null;
    } catch (reason) {
      console.log(reason);
      // this.loggerService.errorLog(reason)
      return null;
    }
  }
  // set a key/value object
  async setObject(key: string, object: Object) {
    try {
      if (this.Enablecrypto) {
        let data = JSON.stringify(object)
        const result = await this.storage.set(key, await this.encyption.encryptData(data));
        console.log('set Object in storage: ' + result);
        return true;
      } else {
        const result = await this.storage.set(key, JSON.stringify(object));
        console.log('set Object in storage: ' + result);
        return true;
      }
    } catch (reason) {
      console.log(reason);
      // this.loggerService.errorLog(reason)
      return false;
    }
  }
  // get a key/value object
  async getObject(key: string): Promise<any> {
    try {
      if (this.Enablecrypto) {
        const result = await this.storage.get(key);
        if (result != null) {
          let data = await this.encyption.decryptData(result)
          return JSON.parse(data);
        }
      } else {
        const result = await this.storage.get(key);
        if (result != null) {
          return JSON.parse(result);
        }
      }
      return null;
    } catch (reason) {
      console.log(reason);
      // this.loggerService.errorLog(reason)
      return null;
    }
  }
  // remove a single key value:
  remove(key: string) {
    this.storage.remove(key);
  }
  //  delete all data from your application:
  clear() {
    this.storage.clear();
  }
  create() {
    this.storage.create();
  }
}
