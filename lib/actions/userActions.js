"use server"

import { ID, Query }  from "node-appwrite"
import process from 'node:process';
import { createSessionClient, createAdminClient } from "../server/appwrite"
import { dataStringify, encryptId, extractCustomerIdFromUrl } from "../utils"
import { cookies } from "next/headers"
import { ProcessorTokenCreateRequestProcessorEnum} from "plaid"
import { plaidClient } from "./plaid"
import { revalidatePath } from "next/cache"
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions"



const {
  APPWRITE_DATABASEID: DATABASE_ID,
  APPWRITE_BANK_COLLECTIONID: BANK_COLLECTION_ID,
  APPWRITE_USER_COLLECTIONID: USER_COLLECTION_ID

} = process.env

const getUserInfo = async ({userId}) => {

  try {
      const { database } = await createAdminClient();

      const user = await database.listDocuments(
        DATABASE_ID,
        USER_COLLECTION_ID,
        [Query.equal("userId", userId)],

      )
          if (!user || user.documents.length === 0 ) {
             throw new Error("User not found");
          }
      return dataStringify(user.documents[0]);
      
     } catch (error) {
      console.error("Error gettting banks:", error?.body || error.message || error)
      
     }

}
export const signIn = async (data) => {
     try {
      const { account } = await createAdminClient();


      const session = await account.createEmailPasswordSession(data.email, data.password);

      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })

      const user = await getUserInfo({userId: session.userId});

      if (!user) {
        throw new Error("Error signing in user");
      }

      return user;

     } catch (error) {
        console.log("Error signing in user:", error?.body || error.message || error);
     }
};

export const signUp = async (data) => {

  const {password} = data

  const {
    email, 
    firstName, 
   lastName,
    city,
    state,
    postalCode,
    address1,
    ssn,
    dateOfBirth,
  


  } = data;

  let newUserAccount;
    try {
         const { account, database } = await createAdminClient();

         newUserAccount =  await account.create(
            ID.unique(), 
            email, 
            password, 
           `${firstName} ${lastName}`);

          if(!newUserAccount) throw new Error('Error creating user account');
 
      const dwollaCustomerUrl = await createDwollaCustomer({
            firstName,
            lastName,
            email,
            city,
            state,
            address1,
            postalCode,
            dateOfBirth,
            type: "personal",
            ssn,
          });

          if (!dwollaCustomerUrl) throw new Error('Error creating dwolla customer');

          const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

          const newUser = await database.createDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            ID.unique(),
            {
              ...data,
              password,
              userId: newUserAccount.$id,
              dwollaCustomerId,
              dwollaCustomerUrl
            }
          )


         const session = await account.createEmailPasswordSession(email, password);
      
         cookies().set("appwrite-session", session.secret, {
         path: "/",
         httpOnly: true,
         sameSite: "strict",
         secure: true,
         });

        return dataStringify(newUser)

    } catch (error) {
       console.error('Error', error)
    }


}

export async function getLoggedInUser() {
   try {
     const { account } = await createSessionClient();

     const response = await account.get();


     const user = await getUserInfo({ userId: response.$id });
     
     return user;

   } catch (error) {
     return null;   
    }
 }

 export const logOut = async () => {

  
  try {

    const { account } = await createSessionClient();

    cookies().delete('appwrite-session');

    await account.deleteSession('current');

    
  } catch (error) {
    return null;
    
  }
 }

 export const createLinkToken = async (user) => {
  const { $id, firstName, lastName} = user;

  if (!$id || !firstName || !lastName) {
    throw new Error ("Missing required Field For Creating Token")
  }
  try {
    const tokenParams = {
      user: {
        client_user_id: $id
      },
      client_name: `${firstName} ${lastName}`,
      products: ['auth', 'identity', 'transactions'],
      language: 'en',
      country_codes: ['US'],
      update: {reauthorization_enabled: true}
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return { linkToken: response.data.link_token }
  } catch (error) {
    console.log("Error Creating Token ", error?.response?.data || error.message || error);
    return null
  }
}
 export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId,
 }) => {

    try {
      const { database } = await createAdminClient();

      const bankAccount = await database.createDocument(
        DATABASE_ID,
        BANK_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          bankId,
          accountId,
          accessToken,
          fundingSourceUrl,
          sharableId,
        }
      );

      return dataStringify(bankAccount)

    } catch (error) {
      console.log("Error Creating Bank Account", error?.response?.data || error.message || error);
      return null;
    }
 }

 export const exchangePublicToken = async ({ publicToken, user} ) => {
     try {

 

      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      })

      // get the accesId and the item Id from the response gotten from the plaid client exchange

      
      const accessToken = response.data.access_token;
      const itemId = response.data.item_id

   

      // Get account information using the accessToken

      const accResponse = await plaidClient.accountsGet({
       access_token: accessToken
      });

    


      // Get user account info from Plaid response

      const accData = accResponse.data.accounts[0]

     // Create a Dwolla request to make transactions 

  

     const processorTokenResponse = await plaidClient.processorTokenCreate({
      access_token: accessToken,
      account_id:accData.account_id,
      processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla
     });
     
     // Get the processor token fron the request with Dwolla

     const processorToken = processorTokenResponse.data.processor_token



     // Add a funding source so we can be able to transfer Funds 

     const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accData.name
     });

     // Check if there is a FundingSource and throw an Error if there is none

     if(!fundingSourceUrl) throw Error("Error Adding Funding Source, Please Try Again");

     // Create a bank accout with UserId, BankId, AccountId, AccessToken, FundingSourceUrl, SharableId

     

     await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accData.account_id)



     });



     // Revalidate the path to reflect changes
     revalidatePath("/")

     // Return a Success message

     return dataStringify({
      publicTokenExchange: "Complete"
     }
      
     )
     
      
     } catch (error) {
       console.error(
        "An error occurred while exchanging the public token", error
       );
     }
 }

 export const getBanks = async ({ userId }) => {
     try {
      const { database } = await createAdminClient();

      const banks = await database.listDocuments(
        DATABASE_ID,
        BANK_COLLECTION_ID,
        [Query.equal("userId", userId)],

      )

      return dataStringify(banks.documents);
      
     } catch (error) {
      console.error("Error gettting banks:", error?.body || error.message || error)
      
     }
 }
 export const getBank = async ({ documentId }) => {
     try {
      const { database } = await createAdminClient();

      const bank = await database.listDocuments(
        DATABASE_ID,
        BANK_COLLECTION_ID,
        [Query.equal("$id", documentId)],

      )

      return dataStringify(bank.documents[0]);
      
     } catch (error) {
      console.error("Error gettting banks:", error?.body || error.message || error)
      
     }
 }
 export const getBankByAccountId = async ({ accountId }) => {
     try {
      const { database } = await createAdminClient();

      const bank = await database.listDocuments(
        DATABASE_ID,
        BANK_COLLECTION_ID,
        [Query.equal("accountId", accountId)],

      );

      
    if(!bank || bank.documents.length === 0) {
      throw new Error("No Bank Accounts With This Id.")
    }

      return dataStringify(bank.documents[0]);
      
     } catch (error) {
      console.error("Error gettting banks:", error?.body || error.message || error)
      
     }
 }


 