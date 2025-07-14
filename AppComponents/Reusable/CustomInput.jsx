import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import React from "react";

export const CustomInput = ({ control, placeholder, type, label, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="form-item">
            <FormLabel className="form-label"> {label} </FormLabel>
            <div className=" flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  {...field}
                  className="form-input"
                />
              </FormControl>

              <FormMessage className="form-message" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

CustomInput.propTypes = {
  control: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export const TransferInput = ({
  control,
  label,
  name,
  description,
  children,
  className = "",
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`border-y border-gray-200 ${className}`}>
          <div className="payment-transfer_form-item py-5">
            {label && (
              <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                {label}
              </FormLabel>
            )}
            {description && (
              <FormDescription className="text-12 font-normal text-gray-600">
                {description}
              </FormDescription>
            )}

            <div className="flex w-full flex-col">
              <FormControl>{children(field)}</FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

TransferInput.propTypes = {
  control: PropTypes.any.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};
