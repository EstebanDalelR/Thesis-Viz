const express = require('express');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');

var router = express.Router();

const spreadsheetID = '1pNFVnPjmPkgng2r6BAan85JPElH2TR1sZGZFZdS7rH0';
var doc = new GoogleSpreadsheet(spreadsheetID);

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});


/* Helper func to get the tweeter handle from "camara"*/
function getCamara(callback) {
  doc.useServiceAccountAuth(
    creds,
    (err, resp) => {
      if (err) throw err;
      var representantesCamara =
        doc.getCells(
          1,
          { "min-row": 1, "min-col": 1, "max-col": 4 },
          (err2, cells) => {
            if (err2) throw err2;
            var representantesCamara = [];
            let cellValues = [];
            cells.forEach(element => {
              cellValues.push(element._value);
            });
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



/* GET tweetArray */
router.get('/camara', (req, res) =>
  getCamara((representantes) => {
    res.json(representantes);
  })
);

module.exports = router;
