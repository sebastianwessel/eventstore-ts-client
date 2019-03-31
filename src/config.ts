import { ConfigurationError } from "./errors"
import * as joi from "joi"
import { configurationSchema } from "./schemas"
import * as bunyan from 'bunyan'

interface EventstoreSettings {
  useSSL: boolean;
  host: string;
  port: number;
  credentials: {
    username: string;
    password: string;
  };
  verify: boolean;
  logger:bunyan;
}

const defaultSettings: EventstoreSettings = {
  credentials: {
    password: "changeit",
    username: "admin"
  },
  host: "127.0.0.1",
  port: 123,
  useSSL: true,
  verify: true,
  logger: bunyan.createLogger({
    name:'eventstore-ts-client'
  })
}

/**
 * Settings for eventstore connection and options
 *
 * @class ConnectionSettings
 */
class ConnectionSettings {
  protected settings: EventstoreSettings
  public constructor(customSettings: object | EventstoreSettings) {
    const { error, value } = joi.validate(customSettings, configurationSchema)
    if (error) {
      throw new ConfigurationError()
    }

    this.settings = { ...defaultSettings, ...value }
  }

  /**
   * Set connection default password
   *
   * @memberof ConnectionSettings
   */
  public set password(newPassword: string) {
    this.settings.credentials.password = newPassword
  }

  /**
   * Returns connection default password
   *
   * @type {string}
   * @memberof ConnectionSettings
   */
  public get password():string{
    return this.settings.credentials.password
  }

  /**
   * Set connection default username
   *
   * @memberof ConnectionSettings
   */
  public set username(newUserName: string) {
    this.settings.credentials.password = newUserName
  }

  /**
   *Returns connection default username
   *
   * @type {string}
   * @memberof ConnectionSettings
   */
  public get username():string{
    return this.settings.credentials.username
  }

  /**
   * Set host name or ip to connect to eventstore
   *
   * @memberof ConnectionSettings
   */
  public set host(hostname: string) {
    this.settings.host = hostname 
  }

  /**
   * Returns connection host name or ip
   *
   * @type {string}
   * @memberof ConnectionSettings
   */
  public get host():string{
    return this.settings.host
  }

  /**
   * Set port of eventstore
   *
   * @memberof ConnectionSettings
   */
  public set port(port: number) {
    this.settings.port = port
  }

  /**
   * Return port of eventstore
   *
   * @type {number}
   * @memberof ConnectionSettings
   */
  public get port():number {
    return this.settings.port
  }

  /**
   * Enable SSL for connection
   */
  public enableSSL():void{
    this.settings.useSSL=true
  }

  /**
   * Disable SSL for connection
   */
  public disableSSL():void{
    this.settings.useSSL=false
  }

  /**
   * Inidicates if ssl is enabled (true) or disabled (false)
   *
   * @readonly
   * @type {boolean}
   * @memberof ConnectionSettings
   */
  public get isSSLEnabled():boolean{
    return this.settings.useSSL
  }

  /**
   * Use given logger for log instead of creating a new one
   *
   * @memberof ConnectionSettings
   */
  public set logger(newLogger:bunyan){ 
    this.settings.logger=newLogger
  }
 
  /**
   * Returns logger instance
   *
   * @type {bunyan}
   * @memberof ConnectionSettings
   */
  public get logger():bunyan{
    return this.settings.logger
  }
}

export { ConnectionSettings }
