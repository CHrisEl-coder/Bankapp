import { clsx } from "clsx";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import queryString from "query-string";
import { transactionCategoryStyles } from "@/constants";


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (amount) => {
    // eslint-disable-next-line no-undef
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: "2"
    });

    return formatter.format(amount);
};

export const AuthformSchema = (type) => z.object({
  // for sign-up

  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName:type === 'sign-in' ? z.string().optional() :  z.string().min(3),
  address1: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(50),
  postalCode:type === 'sign-in' ? z.string().optional() :  z.string().min(3).max(6),
  dateOfBirth:type === 'sign-in' ? z.string().optional() :  z.string().min(6),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2),
  city: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  
  // both sign-in and sign-up
  email: z.string().email(),
  password: z.string().min(8)
});

export const dataStringify = (data) => JSON.parse(JSON.stringify(data));


export function encryptId(id) {
  return btoa(id);
}

export function decryptId(id) {
  return atob(id);
}


export function extractCustomerIdFromUrl(url) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function formUrlQuery({ params, key, value }) {
  const currentUrl = queryString.parse(params);

  currentUrl[key] = value;

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}


export function getAccountTypeColors(type) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-amber-25",
        lightBg: "bg-amber-100",
        title: "text-amber-900",
        subText: "text-amber-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
};


export const getTransactionStatus = (date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};


export const removeSpecialCharacters = (value) => {
  return value.replace(/[^\w\s]/gi, "");
};

export const formatDateTime = (dateString) => {
  const dateTimeOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};


export function countTransactionCategories(transactions ) {

  const categoryCounts = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (Object.prototype.hasOwnProperty.call(categoryCounts, category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}




extractCustomerIdFromUrl.propTypes = {
  url: PropTypes.string
}

encryptId.propTypes = {
  id: PropTypes.string
}

decryptId.propTypes = {
  id: PropTypes.string
}

export const matchCategoryStyles = (category) => {

  if(!category) {
    return transactionCategoryStyles.default
  }

  const lowerCase = category.toLowerCase()

  const matchedKeys = Object.keys(transactionCategoryStyles).find((key) => {
    const keyNames = key.toLowerCase().split(/\s|_/);
    return keyNames.some((word) => lowerCase.includes(word))
  })

  return matchedKeys ? transactionCategoryStyles[matchedKeys] : transactionCategoryStyles.default

}