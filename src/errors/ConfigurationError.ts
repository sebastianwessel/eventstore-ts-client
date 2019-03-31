const errorMessage = 'Eventstore configuration failure'

/**
 * Error for invalid configuration settings to connect to eventstore
 *
 * @export
 * @class ConfigurationError
 * @extends {Error}
 */
export class ConfigurationError extends Error {
    public constructor(){
        super(errorMessage)
    }
}