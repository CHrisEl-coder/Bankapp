"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DropDown } from "./DropDown";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/userActions";
import { decryptId } from "@/lib/utils";

// import { BankDropdown } from "./bank/BankDropdown";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TransferInput } from "./Reusable/CustomInput";
import PropTypes from "prop-types";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // create transfer
      const transfer = await createTransfer(transferParams);

      // create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error While Transfering Funds: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <TransferInput
          control={form.control}
          name={"senderBank"}
          label={"Select Source Bank"}
          description={
            " Select the bank account you want to transfer funds from"
          }
        >
          {() => (
            <DropDown
              accounts={accounts}
              setValue={form.setValue}
              otherStyles="!w-full"
            />
          )}
        </TransferInput>

        <TransferInput
          control={form.control}
          name={"name"}
          label={"Transfer Note (Optional)"}
          description={
            "Provide Additional Information Related To The Transfer."
          }
        >
          {(field) => (
            <Textarea
              placeholder="Write a short note here"
              className="input-class"
              {...field}
            />
          )}
        </TransferInput>

        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <TransferInput
          control={form.control}
          name={"email"}
          label={"Recipient&apos;s Email Address"}
        >
          {(field) => (
            <Input
              placeholder="ex: johndoe@gmail.com"
              className="input-class"
              {...field}
            />
          )}
        </TransferInput>

        <TransferInput
          control={form.control}
          name={"sharableId"}
          label={"Receiver&apos;s Plaid Sharable Id"}
        >
          {(field) => (
            <Input
              placeholder="Enter the public account number"
              className="input-class"
              {...field}
            />
          )}
        </TransferInput>

        <TransferInput control={form.control} name={"amount"} label={"Amount"}>
          {(field) => (
            <Input placeholder="ex: 5.00" className="input-class" {...field} />
          )}
        </TransferInput>

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

PaymentTransferForm.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default PaymentTransferForm;
