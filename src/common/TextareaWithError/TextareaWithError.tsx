import React from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { formFieldsMap } from "../FormFieldWithError/formFieldsMap";

const style = {
  textarea: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

interface ErrorMessages {
  title: string;
  description: string;
  duration: string;
  authors: string;
}
interface TextareaProps {
  name: string;
  value: string;
  errorMessages: ErrorMessages;
  onChange: (e?) => void;
}

export const TextareaWithError = ({
  name,
  value,
  errorMessages,
  onChange,
}: TextareaProps) => {
  const config = formFieldsMap[name];

  return (
    <div>
      <label htmlFor={config.inputID} className="font-bold capitalize">
        {config.labelText}
        <textarea
          id={config.inputID}
          placeholder={config.placeholderText}
          name={config.name}
          value={value}
          className={style.textarea}
          onChange={onChange}
        ></textarea>
      </label>
      <ErrorMessage errorMessage={errorMessages.description} />
    </div>
  );
};
