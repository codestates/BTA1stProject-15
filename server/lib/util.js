const logger = require('../config/winston.js')
const moment = require('moment')

//비밀번호 랜덤 함수
function createCode() {
    //숫자 + 문자 + 특수문자 새로운 비밀번호 생성
    const arr = "0,1,2,3,4,5,6,7,8,9".split(",");//,a,b,c,d,e,r,s,!,@,#,$,%,^,&,*,-,+,=,?,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
    let randomStr = "";
    for (let j=0; j<6; j++) {
        randomStr += arr[Math.floor(Math.random()*arr.length)];
    }
    return randomStr;
}

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr)
}

module.exports = {
  createCode : createCode,
  timeStampFormat : timeStampFormat,
  replaceAll : replaceAll,

}
