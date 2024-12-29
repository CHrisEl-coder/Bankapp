"use server"

import { ID } from "node-appwrite"
import { createSessionClient, createAdminClient } from "../server/appwrite"
import { dataStringify } from "../utils"
import { cookies } from "next/headers"

export const signIn = async ({email, password}) => {
     try {
      const { account } = await createAdminClient();

      const response = await account.createEmailPasswordSession(email, password)

      return dataStringify(response);

     } catch (error) {
        return null;
     }
};

export const signUp = async (UserDetails) => {
  const {email, password, firstname, lastname} = UserDetails;
    try {
         const { account } = await createAdminClient();

        const newUser =  await account.create(
            ID.unique(), 
            email, 
            password, 
           `${firstname} ${lastname}`);
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

     const user = await account.get();
     
     return dataStringify(user);

   } catch (error) {
     console.log('Error', error)
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
 