export var JSDataEncryption = function () {
  this.DefaultKey = "";

  this.Encrypt = function (vDataToEncrypt, vPassKey) {
    if (vDataToEncrypt == "")
      return vDataToEncrypt;

    var key = CryptoJS.enc.Utf8.parse(vPassKey);
    var iv = CryptoJS.enc.Utf8.parse(vPassKey);

    var ReturnVal = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(vDataToEncrypt), key,
      {
        keySize: 16, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
      });

    return "encv." + ReturnVal;
  }
  this.Decrypt = function (vDataToDecrypt, vPassKey) {
    if (vDataToDecrypt == "")
      return vDataToDecrypt;
    var key = CryptoJS.enc.Utf8.parse(vPassKey);
    var iv = CryptoJS.enc.Utf8.parse(vPassKey);
    vDataToDecrypt = vDataToDecrypt.replace('encv.', '');
    var ReturnVal = CryptoJS.AES.decrypt(vDataToDecrypt, key,
      {
        keySize: 16,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return ReturnVal.toString(CryptoJS.enc.Utf8);
  }
}
