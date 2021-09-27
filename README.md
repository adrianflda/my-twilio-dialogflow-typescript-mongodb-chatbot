# my-twilio-dialogflow-typescript-mongodb-chatbot

## initial config
- Clone repo [my-twilio-dialogflow-typescript-mongodb-chatbot](https://github.com/adrianflda/my-twilio-dialogflow-typescript-mongodb-chatbot) :)
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
```
docker-compose up --build
```
- [Configure ngrok](https://dashboard.ngrok.com/get-started/setup)
```
./ngrok http 3000
```
- Copy your exposed server URL and open [Twilio Whatsapp Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox). Replace the URL in WHEN A MESSAGE COMES IN with your exposed URL. Don’t forget to add the path to our bot controller. i.e. /api/bot

- Copy your exposed server URL and open [Dialogflow enable and manage fulfillment](https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#enable). Don’t forget to add the path to our dialog webhook controller. i.e. /api/dialog/webhook

