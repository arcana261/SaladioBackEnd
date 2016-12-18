"use strict";

const express = require('express');
const path = require('path');
const parser = require('raml-parser');

const PORT = process.env.PORT || 3000;

parser.loadFile(path.join(__dirname, 'raml/saladio-api.raml'))
  .then(raml => {
    console.log('hey!', raml);
  }).catch(err => console.error('NO! ERROR OCCURED:', err));
