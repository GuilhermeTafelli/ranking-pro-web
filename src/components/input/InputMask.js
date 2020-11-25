import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask'

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />;
}