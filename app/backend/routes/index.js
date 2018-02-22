const express = require('express');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
  console.log('Calling');
  res.render('index', { title: 'Express' });
  getTwits();
});

/* Helper func to get the tweets */
function getTwits() {
  const spreadsheetID = '1pNFVnPjmPkgng2r6BAan85JPElH2TR1sZGZFZdS7rH0';
  var doc = new GoogleSpreadsheet(spreadsheetID);
  doc.useServiceAccountAuth(creds, function (err) {
 
    // Get all of the rows from the spreadsheet.
    doc.getRows(1, function (err, rows) {
      console.log(rows);
    });
  });
}


/* GET tweetArray */
router.get('/twits', function (req, res) {
getTwits();
});

module.exports = router;
