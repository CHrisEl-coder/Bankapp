// Code to interact with Plaid API
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";


const configuration = new Configuration({
    // eslint-disable-next-line no-undef
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
        headers: {
            // eslint-disable-next-line no-undef
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            // eslint-disable-next-line no-undef
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    }
});

export const plaidClient = new PlaidApi(configuration)