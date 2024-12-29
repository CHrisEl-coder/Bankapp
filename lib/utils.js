import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: "2"
    });

    return formatter.format(amount);
};

export const AuthformSchema = (type) => z.object({
  // for sign-up

  firstname: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastname:type === 'sign-in' ? z.string().optional() :  z.string().min(3),
  address1: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(50),
  postalCode:type === 'sign-in' ? z.string().optional() :  z.string().min(3).max(6),
  dateOfBirth:type === 'sign-in' ? z.string().optional() :  z.string().min(6),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  city: type === 'sign-in' ? z.string().optional() : z.string().min(2),
  
  // both sign-in and sign-up
  email: z.string().email(),
  password: z.string().min(8)
});

export const dataStringify = (data) => JSON.parse(JSON.stringify(data));