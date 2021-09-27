import * as bodyParser from "body-parser";
import * as controllers from "./controllers";
import { Server } from "@overnightjs/core";
import helmet from "helmet";
import cors from "cors";
import { connect } from './config/mongo';
import { run } from './utils/initialize'

export class AppServer extends Server {
    private readonly SERVER_STARTED = "Server started on port: ";

    constructor() {
        super(true);
        connect();
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.app.get("*", (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });
        run();
    }
}