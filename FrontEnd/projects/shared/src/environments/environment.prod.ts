
export const environment = {
  production: "false",
  serverurl : "http://highstreet.webkodz.com/api/",
  baseUrl : "http://highstreet.webkodz.com/",
  // serverurl : "http://192.168.1.102:5610/api/",
  // baseUrl : "http://192.168.1.102:5610/",
  validator : {

     emailPattern : "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
     passwordPattern : "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}",
     mobilePatternUAE : "(?:\+971|0(0971)?)(?:[234679]|5[01256])[0-9]{7}",
     numberWith2Decimal : "/^\d+\.\d{2}$/",
     numberValidation : '"^((\\+91-?)|0)?[0-9]{10}$"'
  }
};