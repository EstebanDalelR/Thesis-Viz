# Backend
## Requirements
This app requires 2 files: **spreadsheets.json** and **twitter.json**, both in the `/routes` folder. These can be obtained in the [Google Developer Console](https://console.developers.google.com/) and the [Tweeter Developer Page](https://developer.twitter.com/).
### `spreadsheets.json`
`{
  "type": "service_account",   
  "project_id": "",   
  "private_key_id": "",  
  "private_key": "",  
  "client_email": "",  
  "client_id": "",  
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",  
  "token_uri": "https://accounts.google.com/o/oauth2/token",  
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",  
  "client_x509_cert_url": ""  
}` 
### `twitter.json`
`{
    "TWITTER_CONSUMER_KEY":"",
    "TWITTER_CONSUMER_SECRET":"",
    "TWITTER_ACCESS_TOKEN_KEY":"",
    "TWITTER_ACCESS_TOKEN_SECRET":""
}`

## Routes

#### /twitsfromamount/:handle/:amount
Returns a JSON with the last _amount_ twits from _handle_.  
Known bug: RTs come in just 140 characters, including "RT @_handle_:".

#### /twitsfrom/:handle/
Returns a JSON with the last 200 twits from _handle_.  
Known bug: RTs come in just 140 characters, including "RT @_handle_:".
