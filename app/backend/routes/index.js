const express = require('express');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');

var router = express.Router();

/* Const of the spreadsheetID (found in the URL) */
const spreadsheetID = '1pNFVnPjmPkgng2r6BAan85JPElH2TR1sZGZFZdS7rH0';
var doc = new GoogleSpreadsheet(spreadsheetID);

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* ---------------------------CAMARA----------------------------- */

/* Helper func to get the contents from "camara"*/
function getCamara(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(creds, (err, resp) => {
    if (err) throw err;

    /* Now that we've auth'd, get all the cells */
    doc.getCells(1, { "min-row": 1, "min-col": 1, "max-col": 4 }, (err2, cells) => {
      if (err2) throw err2;

      var representantesCamara = [];
      let cellValues = [];

      /* Get all the values into cellValues */
      cells.forEach(element => {
        cellValues.unshift(element._value);
      });

      /* While cellValues != empty, push 4 elements (a row) as an object */
      while (cellValues.length > 0) {
        var repCamara = [];
        for (let col = 0; col < 4; col++) {
          repCamara.push(cellValues.pop());
        }
        representantesCamara.push(repCamara);
      }
      callback(representantesCamara);
    })
  })
}

/* GET JSON from /camara */
router.get('/camara', (req, res) =>
  getCamara((representantes) => {
    res.json(representantes);
  })
);

/* ---------------------------MEDIOS----------------------------- */

/* Helper func to get the contents from "medios"*/
function getMedios(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(creds, (err, resp) => {
    if (err) throw err;

    /* Now that we've auth'd, get all the cells */
    doc.getCells(2, { "min-row": 1, "min-col": 1, "max-col": 2 }, (err2, cells) => {
      if (err2) throw err2;

      var medios = [];
      let cellValues = [];

      /* Get all the values into cellValues */
      cells.forEach(element => {
        cellValues.unshift(element._value);
      });
      /* While cellValues != empty, push 4 elements (a row) as an object */
      while (cellValues.length > 0) {
        var medio = [];
        for (let col = 0; col < 2; col++) {
          medio.push(cellValues.pop());
        }
        medios.push(medio);
      }
      callback(medios);
    })
  })
}

/* GET JSON from /medios */
router.get('/medios', (req, res) =>
  getMedios((medios) => {
    res.json(medios);
  })
);

/* ---------------------------HASHTAGS----------------------------- */

/* Helper func to get the contents from "hashtags"*/
function getHashtags(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(creds, (err, resp) => {
    if (err) throw err;

    /* Now that we've auth'd, get all the cells */
    doc.getCells(5, { "min-row": 1, "min-col": 1 }, (err2, cells) => {
      if (err2) throw err2;

      var hashtags = [];
      let cellValues = [];

      /* Get all the values into cellValues */
      cells.forEach(element => {
        cellValues.unshift(element._value);
      });
      /* While cellValues != empty, push 4 elements (a row) as an object */
      while (cellValues.length > 0) {
        var hashtag = [];
        for (let col = 0; col < 1; col++) {
          hashtag.push(cellValues.pop());
        }
        hashtags.push(hashtag);
      }
      callback(hashtags);
    })
  })
}

/* GET JSON from /hashtags */
router.get('/hashtags', (req, res) =>
  getHashtags((hashtags) => {
    res.json(hashtags);
  })
);

module.exports = router;
