# my-twilio-dialogflow-typescript-mongodb-chatbot

## initial config
- [Twilio](https://www.twilio.com/docs/libraries/node)
    - In the root of your project create a .env file and add this
        ```
        TWILIO_ACCOUNT_SID=PLACEHOLDER
        TWILIO_AUTH_TOKEN=PLACEHOLDER
        DIALOGFLOW_PROJECT_ID=PLACEHOLDER
        ```
- [DialogFlow Set up authentication](https://cloud.google.com/dialogflow/es/docs/quick/setup#auth)
    - Rename the downloaded JSON file to credentials.json
    - Copy it to root folder

## test locally
- [Configure ngrok](https://dashboard.ngrok.com/get-started/setup)

```
npm install

npm run build

npm run start

./ngrok http 3000
```
- Copy your exposed server URL and open [Twilio Whatsapp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox). Replace the URL in WHEN A MESSAGE COMES IN with your exposed URL. Don’t forget to add the path to our bot controller. i.e. /api/bot


