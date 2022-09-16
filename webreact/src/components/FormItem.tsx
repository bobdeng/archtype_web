import {ReactNode} from "react";

interface FormItemProps {
  label?: string;
  children?: ReactNode;
}

export function FormItem(props: FormItemProps) {
  let childrenId = "";
  // @ts-ignore
  if (props.children && props.children.props) {
    // @ts-ignore
    childrenId = props.children.props.id;
  }
  return <div>
    <label htmlFor={childrenId} className="block p-2 dark:bg-gray-700 dark:text-white text-sm font-medium text-gray-700" role={"label"}>{props.label}</label>
    {props.children}
  </div>;
}