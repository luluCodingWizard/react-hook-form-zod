import "@/styles/global.css";
import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import mockAPICall from "../../lib/mockApiCall";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});
const Index = () => {
  const form = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        name: data.name,
        email: data.email,
        age: 18,
      };
    },
    resolver: zodResolver(schema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const mySubmitFunc = async (data) => {
    // Simulate an API call
    console.log("submitted:" + data);
  };
  console.log(isSubmitSuccessful);
  return (
    <div>
      <form
        onSubmit={handleSubmit(mySubmitFunc)}
        className=" bg-gray-200 w-4/5 mx-auto p-4"
      >
        <input
          type="text"
          {...register("name")}
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
          disabled={isSubmitting}
          className="mt-4 bg-red-200 hover:bg-red-400 p-2 rounded-md disabled:bg-gray-400"
        >
          Submit
        </button>
        {errors.root && (
          <p className=" text-sm text-red-600">{errors.root.message}</p>
        )}
      </form>
      {isSubmitSuccessful && (
        <p className=" text-md text-green-600">Form been Submitted!</p>
      )}
      <DevTool control={control} />
    </div>
  );
};

export default Index;
