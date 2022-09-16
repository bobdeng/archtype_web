import { ChangeEvent } from 'react';

interface InputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string | number;
  placeholder?: string
}

export function Input(props: InputProps) {

  return <div>
    <input type="text"
           role={"input"}
           placeholder={props.placeholder}
           value={props.value}
           onChange={e => props.onChange && props.onChange(e)}
           className="bg-white-100 mx-2 w-1/2 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </input>
  </div>;
}