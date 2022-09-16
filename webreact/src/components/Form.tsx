import { ReactNode } from 'react';

interface FormProps {
  children: ReactNode
}

export function Form(props: FormProps) {
  return <div role={"form"}>
    {props.children}
  </div>;
}