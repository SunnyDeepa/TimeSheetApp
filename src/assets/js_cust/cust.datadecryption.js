
export var JSDataDecryption = function () {
  this.DefaultKey = "";

  this.Decrypt = function (vDataToDecrypt, vPassKey) {
    if (vDataToDecrypt == "")
      return vDataToDecrypt;

    var key = CryptoJS.enc.Utf8.parse(vPassKey);
    var iv = CryptoJS.enc.Utf8.parse(vPassKey);
    vDataToDecrypt = vDataToDecrypt.replace('encv.', '');
    var ReturnVal = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(vDataToDecrypt), key,
      {
        keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
      });

    return ReturnVal;
  }
}
