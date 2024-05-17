import React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const style = {
	textarea: `py-3 px-4 leading-6 rounded border border-[#CFCFCF] focus:outline-[#007298] w-full`,
};

interface TextareaProps {
	labelText: string;
	placeholderText: string;
	name: string;
	value: string;
	textareaID: string;
	errorMessage?: string;
	/* eslint-disable */
  onChange: (e?: any) => void;
}

export const TextareaWithError = ({
  labelText,
  placeholderText,
  name,
  value,
  textareaID,
  errorMessage,
  onChange,
}: TextareaProps) => {
  return (
    <div>
      <label htmlFor={textareaID} className="font-bold capitalize">
        {labelText}
        <textarea
          id={textareaID}
          placeholder={placeholderText}
          name={name}
          value={value}
          className={style.textarea}
          onChange={onChange}
        ></textarea>
      </label>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
