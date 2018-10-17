const Generate = {};

Generate.randomNumber = function() {
  return Math.floor(Math.random() * 1000);
};


Generate.newId = function() {
  return `RSA-PAL-2018-${this.randomNumber()}`;
};

export default Generate;
