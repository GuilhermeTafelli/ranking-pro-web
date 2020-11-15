import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Select } from '@material-ui/core';

export default function SelectInput({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <Select inputRef={inputRef} defaultValue={defaultValue} {...rest} />;
}