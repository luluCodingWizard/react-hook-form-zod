import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import mockAPICall from "../../lib/mockApiCall";
const Index = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const mySubmitFunc = (data) => {
    console.log("my form is submitted.... :) ");
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(mySubmitFunc)}
        className=" bg-gray-200 w-4/5 mx-auto p-4"
      >
        <input
          type="text"
          {...register("name", {
            required: "name is required",
          })}
          placeholder="Enter your name"
          className=" border-gray-600 border-2 mt-2"
        />

        <br />
        {errors.name && (
          <p className=" text-sm text-red-600">{errors.name.message}</p>
        )}

        <input
          type="number"
          {...register("age", {
            required: "age is required",
            min: {
              value: 16,
              message: "the age should be more than 16",
            },
          })}
          placeholder="Enter your age"
          className=" border-gray-600 border-2 mt-2"
        />

        <br />
        {errors.age && (
          <p className=" text-sm text-red-600">{errors.age.message}</p>
        )}

        <input
          type="email"
          {...register("email", {
            required: "please enter an Email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please enter a valid email address",
            },
            validate: {
              notInfoEmail: (inputValue) => {
                return (
                  inputValue !== "info@mycompany.com" ||
                  "Please enter a different Email"
                );
              },
              notHotmailEmail: (inputValue) => {
                return (
                  !inputValue.endsWith("hotmail.com") ||
                  "We don't support Hotmail address, please use different email."
                );
              },
            },
          })}
          placeholder="Enter your email"
          className=" border-gray-600 border-2 mt-2"
        />
        <br />
        {errors.email && (
          <p className=" text-sm text-red-600">{errors.email.message}</p>
        )}

        <label className="mt-2 block">
          <input type="checkbox" {...register("terms")} />
          Agree to terms and conditions
        </label>
        <br />
        <button
          type="submit"
          className="mt-4 bg-red-200 hover:bg-red-400 p-2 rounded-md"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Index;
