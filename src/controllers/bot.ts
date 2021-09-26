import { Request, Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { runQuery } from "../utils/dialogflow";
import { sendMessage } from "../utils/twilio";

@Controller("api/bot")
export class BotController {

    @Post()
    private postMessage(request: Request, response: Response) {
        // Here we get the message body, the number to which we're sending the message, and the number sending the message.
        const { Body, To, From } = request.body;
        console.log(Body, To, From);

        // Here we're sending the received message to Dialogflow so that it can be identified against an Intent.
        runQuery(Body, From)
            .then((result: any) => {
                console.log(result);
                
                // We send the fulfilment text received back to our user via Twilio
                sendMessage(From, To, result.fulfillmentText)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.error("error is ", error);
                    });
            })
            .catch(error => {
                console.error("error is ", error);
            });
        return response.status(200).send("SUCCESS");
    }

}