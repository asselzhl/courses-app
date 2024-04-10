import React from "react";

import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";

export const Registration = () => {

  return (
    <div>
      <h2 className="text-[#333E48] font-bold text-3xl mb-6">Registration</h2>

      <form className="border-[#CFCFCF] border bg-white rounded w-[600px] py-20 px-36 flex flex-col gap-y-8">
        <div>
          <Input
            type="text"
            labelText="Name"
            placeholderText="Name"
            inputID="username"
            onChange={() => {}}
          />
        </div>
        <div>
          <Input
            type="email"
            labelText="Email"
            placeholderText="Email"
            inputID="email"
            onChange={() => {}}
          />
        </div>
        <div>
          <Input
            type="password"
            labelText="Password"
            placeholderText="Password"
            inputID="password"
            onChange={() => {}}
          />
        </div>
        <Button text="login" onClick={() => {}} />
        <div className="text-center">
          <span>If you have an account you may </span>
          <a href="google.com" className="font-bold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};
