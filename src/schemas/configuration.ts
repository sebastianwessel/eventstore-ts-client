import * as joi from 'joi'

const configurationSchema: joi.ObjectSchema =  joi.object().keys({
    useSSL: joi.boolean(),
    host: joi.string(),
    port: joi.number(),
    credentials: joi.object().keys({
        username: joi.string(),
        password: joi.string()
    }),
    verify: joi.boolean()
}).required().options({allowUnknown:false})

export {configurationSchema}