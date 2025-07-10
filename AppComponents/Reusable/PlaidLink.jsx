import { Button } from "@/components/ui/button";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/userActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export const PlaidLink = ({ user, variant }) => {
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const data = await createLinkToken(user);

        if (data?.linkToken) {
          setToken(data.linkToken);
        } else {
          console.log("Error creating token", data);
        }
      } catch (err) {
        console.log("Error getting back token ", err);
      }
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback(
    async (public_token) => {
      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });

        router.push("/");
      } catch (err) {
        console.log(" Error Exchanging Token ", err);
      }
    },
    [user, router]
  );

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const classMap = {
    primary: "plaidlink-primary",
    ghost: "plaidlink-ghost",
    default: "plaidlink-default",
  };

  return (
    <Button
      onClick={open}
      disabled={!ready}
      className={classMap[variant] || classMap.default}
    >
      {variant === "default" || variant === "ghost" ? (
        <Image
          src={"/icons/connect-bank.svg"}
          width={24}
          height={24}
          alt="connect bank"
        />
      ) : (
        ""
      )}

      <p
        className={`text-[16px] font-medium w-full  ${
          variant === "default" || variant === "ghost"
            ? "hidden text-neutral-600"
            : "text-white"
        } xl:block`}
      >
        Connect Bank{" "}
      </p>
    </Button>
  );
};

PlaidLink.propTypes = {
  user: PropTypes.any,
  variant: PropTypes.string,
};
