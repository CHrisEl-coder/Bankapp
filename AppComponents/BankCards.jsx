import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/userActions";
import React from "react";
import Card from "./Reusable/Card";

const BankCards = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn ? loggedIn?.$id : null,
  });

  return (
    <div className="mt-6">
      <div className=" flex flex-col gap-4 items-start">
        <h2 className=" text-14 font-medium text-neutral-900">My Bank Cards</h2>

        <div className=" flex flex-wrap gap-4">
          {accounts && accounts.data && accounts.data.length > 0 ? (
            accounts.data.map((acc) => (
              <Card
                key={acc.appwriteItemId}
                accounts={acc}
                ownerName={`${loggedIn.firstName}`}
                showBal={true}
              />
            ))
          ) : (
            <p className="flex justify-center items-center text-14 font-medium text-neutral-600">
              {" "}
              No Bank Cards Found, Link an Account.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankCards;
