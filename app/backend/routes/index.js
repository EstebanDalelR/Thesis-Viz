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
        cellValues.push(element._value);
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

module.exports = router;
