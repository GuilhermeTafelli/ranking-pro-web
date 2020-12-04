import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function InputText({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files',
    });
  }, [fieldName, registerField]);
  return <input type="file" ref={inputRef} defaultValue={defaultValue} multiple {...rest} />;
}