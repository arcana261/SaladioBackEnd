'use strict';

class TypeUtils {
  isFunction(value) {
    let getType = {};
    return value && getType.toString.call(value) === '[object Function]';
  }

  isString(value) {
    return typeof value === 'string';
  }

  isArray(value) {
    return value instanceof Array;
  }
}

module.exports = new TypeUtils();
