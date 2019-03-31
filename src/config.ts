import {ConfigurationError} from './errors'
import * as joi from 'joi'
import {configurationSchema} from './schemas'

interface EventstoreSettings {
    useSSL: boolean;
    host: string;
    port: number;
    credentials: {
        username: string;
        password: string;
    };
    verify: boolean;
}

const defaultSettings: EventstoreSettings = {
    credentials: {
        password: "changeme",
        username: "admin"
    },
    host: "127.0.0.1",
    port: 123,
    useSSL: true,
    verify: true
};

/**
 * Settings for eventstore connection and options
 *
 * @class ConnectionSettings
 */
class ConnectionSettings {
    protected settings: EventstoreSettings
    public constructor(customSettings: object | EventstoreSettings) {
        const {error,value}=joi.validate(customSettings,configurationSchema)
        if(error){
            throw new ConfigurationError()
        }
        
        this.settings = { ...defaultSettings, ...value };
    }

    public set password(newPassword: string) {
        this.settings.credentials.password = newPassword;
    }

    public set username(newUserName: string) {
        this.settings.credentials.password = newUserName;
    }

    public set host(newPassword: string) {
        this.settings.credentials.password = newPassword;
    }
}

module.exports = { ConnectionSettings };
