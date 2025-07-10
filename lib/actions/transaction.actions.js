"use server";
import { createAdminClient } from "../server/appwrite";
import { ID, Query } from "node-appwrite";
import { dataStringify } from "../utils"
import process from "node:process";


 const {
      APPWRITE_DATABASEID: DATABASE_ID,
      APPWRITE_TRANSACTIONS_COLLECTIONID: TRANSACTION_COLLECTION_ID
    
    } = process.env


export const getTransactionsByBankId = async ({bankId}) => {

  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID,
      TRANSACTION_COLLECTION_ID,
      [Query.equal('senderBankId', bankId)],
    )

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID,
      TRANSACTION_COLLECTION_ID,
      [Query.equal('receiverBankId', bankId)],
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents, 
        ...receiverTransactions.documents,
      ]
    }

    return dataStringify(transactions);
  } catch (error) {
    console.log(error);
  }
}


export const createTransaction = async (transaction) => {
  try {

    const {database} = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID,
      TRANSACTION_COLLECTION_ID,
      ID.unique(),
      {
        channel: 'online',
        category: 'Transfer',
        ...transaction,
      }
    );

    return dataStringify(newTransaction)
    
  } catch (error) {
    console.error("Error creating transaction: ", error?.body || error.message || error);
    throw new Error("Error During The Transaction Creation")
  }
}