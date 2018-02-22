const express = require('express');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* Helper func to get the tweeter handle from "camara"*/
function getCamara() {
  const spreadsheetID = '1pNFVnPjmPkgng2r6BAan85JPElH2TR1sZGZFZdS7rH0';
  var doc = new GoogleSpreadsheet(spreadsheetID);
  doc.useServiceAccountAuth(creds, function (err) {
    var toRet =
      doc.getCells(
        1,
        { "min-row": 2, "min-col": 1, "max-col": 4 },
        function (err, cells) {
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
          console.log(representantesCamara);
          return representantesCamara;
        });
    return toRet;
  });
}


/* GET tweetArray */
router.get('/camara', function (req, res) {
  getCamara();

});

module.exports = router;
