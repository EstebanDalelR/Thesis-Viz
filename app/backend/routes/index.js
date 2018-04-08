'use strict'
const express = require('express');
const Twitter = require('twitter');
const bodyParser = require('body-parser');
const googleCreds = require('./spreadsheets.json');
const twitterCreds = require('./twitter.json');
const GoogleSpreadsheet = require('google-spreadsheet');
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

/* Const of the spreadsheetID (found in the URL) */
const spreadsheetID = '1pNFVnPjmPkgng2r6BAan85JPElH2TR1sZGZFZdS7rH0';
var doc = new GoogleSpreadsheet(spreadsheetID);
/* Const of twitter */
var client = new Twitter({
  consumer_key: twitterCreds.TWITTER_CONSUMER_KEY,
  consumer_secret: twitterCreds.TWITTER_CONSUMER_SECRET,
  access_token_key: twitterCreds.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: twitterCreds.TWITTER_ACCESS_TOKEN_SECRET
});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* --------------------------------------------------------------- 
  -----------------------TWITTER----------------------------------
  ----------------------------------------------------------------*/

/* Helper function to get the full text of the last 200 tweets from a person */
function getTweetsfrom(handle, callback) {
  client.get('statuses/user_timeline.json',
    { screen_name: handle, count: 200, tweet_mode: "extended"},
    (error, tweets) => {
      /* if (error) throw error; */
      let fullText = [];
      let createdAt = [];
      let response = [];
      tweets.forEach(element => {
        createdAt.push(element.created_at);
        fullText.push(element.full_text);
      });
      while (fullText.length > 0) {
        response.push([fullText.pop(), createdAt.pop()]);
      }
      callback(response);
    })
}

/* GET JSON from /twitsfrom/:handle where :handle is the @... in twitter */
router.get('/twitsfrom/:handle', (req, res) => {
  var handle = req.params.handle;
  getTweetsfrom(handle, (callback) => {
    res.json(callback);
  })
});

/* Helper function to get the full text of the last 'amount' tweets from a person */
function getAmountTweetsfrom(handle, amount, callback) {
  client.get('statuses/user_timeline.json',
    { screen_name: handle, count: amount, tweet_mode: "extended"},
    (error, tweets) => {
      if (error) {
        console.log(error);
        throw error;
      };
      let fullText = [];
      let createdAt = [];
      let response = [];
      if(tweets !==undefined){

        tweets.forEach(element => {
          createdAt.push(element.created_at);
          fullText.push(element.full_text);
        });
        while (fullText.length > 0) {
          response.push([fullText.pop(), createdAt.pop()]);
        }
        
      }
      callback(response);
    })
}

/* GET JSON from /twitsfrom/:handle where :handle is the @... in twitter */
router.get('/twitsfromamount/:handle/:amount', (req, res) => {
  var handle = req.params.handle;
  var amount = req.params.amount;
  console.log(handle,amount);
  getAmountTweetsfrom(handle, amount, (callback) => {
    res.json(callback);
  })
});

/* Helper function to get the full text of the last 200 tweets from a hashtag */
function getTweetsfromHashtag(hashtag, callback) {
  client.get('search/tweets.json',
    { q: hashtag, count: 200, include_entities:true},
    (error, tweets) => {
      if (error) {
        console.log(error);
        throw error;
      };
      let fullText = [];
      let createdAt = [];
      let screenName = [];
      let response = [];
      tweets.statuses.forEach(element => {
        createdAt.push(element.created_at);
        fullText.push(element.text);
        screenName.push(element.user.screen_name);
      });
      while (fullText.length > 0) {
        response.push([screenName.pop(), fullText.pop(), createdAt.pop()]);
      }
      callback(response);
    })
}

/* GET JSON from /twitsfrom/:hashtag where :hashtag is the #... in twitter */
router.get('/twitsfromhashtag/:hashtag', (req, res) => {
  var hashtag = req.params.hashtag;
  getTweetsfromHashtag(hashtag, (callback) => {
    res.json(callback);
  })
});
/* --------------------------------------------------------------- 
  -----------------------SPREADSHEETS------------------------------
  ----------------------------------------------------------------*/

/* ---------------------------CAMARA----------------------------- */

/* Helper func to get the contents from "camara"*/
function getCamara(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(googleCreds, (err, resp) => {
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
  doc.useServiceAccountAuth(googleCreds, (err, resp) => {
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
  doc.useServiceAccountAuth(googleCreds, (err, resp) => {
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


/* ---------------------------CONCEJO----------------------------- */

/* Helper func to get the contents from "concejo"*/
function getConcejales(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(googleCreds, (err, resp) => {
    if (err) throw err;

    /* Now that we've auth'd, get all the cells */
    doc.getCells(8, { "min-row": 1, "min-col": 1 }, (err2, cells) => {
      if (err2) throw err2;

      var concejales = [];
      let cellValues = [];

      /* Get all the values into cellValues */
      cells.forEach(element => {
        cellValues.unshift(element._value);
      });
      /* While cellValues != empty, push 4 elements (a row) as an object */
      while (cellValues.length > 0) {
        var concejal = ('{' +
          '"nombre":"' + cellValues.pop() + '",' +
          '"pagina":"' + cellValues.pop() + '",' +
          '"foto":"' + cellValues.pop() + '",' +
          '"partido":"' + cellValues.pop() + '",' +
          '"comision":"' + cellValues.pop() + '",' +
          '"twitter":"' + cellValues.pop() + '",' +
          '"fotoPartido":"' + cellValues.pop() + '"' +
          '}'
        );
        concejales.push(JSON.parse(concejal));
      }
      callback(concejales);
    })
  })
}

/* GET JSON from /concejales */
router.get('/concejales', (req, res) =>
  getConcejales((concejales) => {
    res.json(concejales);
  })
);
/* ---------------------------SECRETARIOS----------------------------- */

/* Helper func to get the contents from "Secretarios"*/
function getSecretarios(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(googleCreds, (err, resp) => {
    if (err) throw err;

    /* Now that we've auth'd, get all the cells */
    doc.getCells(3, { "min-row": 1, "min-col": 1 }, (err2, cells) => {
      if (err2) throw err2;

      var secretarios = [];
      let cellValues = [];

      /* Get all the values into cellValues */
      cells.forEach(element => {
        cellValues.unshift(element._value);
      });
      /* While cellValues != empty, push 4 elements (a row) as an object */
      while (cellValues.length > 0) {
        var secretario = ('{' +
          '"nombre":"' + cellValues.pop() + '",' +
          '"secretaria":"' + cellValues.pop() + '",' +
          '"foto":"' + cellValues.pop() + '",' +
          '"twitter":"' + cellValues.pop() + '"' +
          '}'
        );
        secretarios.push(JSON.parse(secretario));
      }
      callback(secretarios);
    })
  })
}

/* GET JSON from /secretarios */
router.get('/secretarios', (req, res) =>
  getSecretarios((secretarios) => {
    res.json(secretarios);
  })
);

/* ---------------------------ALCALDIASLOCALES----------------------------- */

/* Helper func to get the contents from "concejo"*/
function getAlcaldiasLocales(callback) {
  /* Authentication method */
  doc.useServiceAccountAuth(googleCreds, (err, resp) => {
    if (err) throw err;

    /* Now that we've auth'd, get all the cells */
    doc.getCells(7, { "min-row": 1, "min-col": 1 }, (err2, cells) => {
      if (err2) throw err2;

      var alcaldiasLocales = [];
      let cellValues = [];

      /* Get all the values into cellValues */
      cells.forEach(element => {
        cellValues.unshift(element._value);
      });
      /* While cellValues != empty, push 4 elements (a row) as an object */
      while (cellValues.length > 0) {
        var alcaldiaLocal = [];
        for (let col = 0; col < 2; col++) {
          alcaldiaLocal.push(cellValues.pop());
        }
        alcaldiasLocales.push(alcaldiaLocal);
      }
      callback(alcaldiasLocales);
    })
  })
}

/* GET JSON from /concejales */
router.get('/alcaldiaslocales', (req, res) =>
  getAlcaldiasLocales((alcaldiasLocales) => {
    res.json(alcaldiasLocales);
  })
);

module.exports = router;
