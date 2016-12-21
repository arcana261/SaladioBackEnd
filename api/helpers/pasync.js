'use strict';

const async = require('async');
const types = require('./types');
const Task = require('co-task');

class PromisefiedAsync {
  map(arr, fn) {
    if (types.isGeneratorFunction(fn)) {
      fn = Task.async(fn);
    }

    return new Promise((resolve, reject) => {
      async.map(arr, (item, cb) => {
        let res = fn(item);

        if (types.isPromise(res)) {
          res.then(res => cb(null, res)).catch(err => cb(err));
        }
        else {
          cb(null, res);
        }
      }, (err, results) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(results);
        }
      })
    });
  }
}

module.exports = new PromisefiedAsync();
