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

  isGeneratorFunction(obj) {
    if (obj === null || obj === undefined) {
      return false;
    }

    let constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return 'function' == typeof constructor.prototype.next && 'function' == typeof constructor.prototype.throw;
  }

  isPromise(obj) {
    if (obj === null || obj === undefined) {
      return false;
    }

    return 'function' == typeof obj.then;
  }
}

module.exports = new TypeUtils();
