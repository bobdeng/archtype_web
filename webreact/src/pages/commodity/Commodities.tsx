import {Button} from "@/components/Button";
import {useState} from "react";
import {AddCommodity} from "@/pages/commodity/AddCommodity";
export function Commodities() {
  const [addVisible, setAddVisible] = useState(false)

  return <div>
    <h1>商品管理</h1>
    <Button onClick={() => setAddVisible(true)}>新增</Button>
    {
      addVisible &&
        <AddCommodity onClose={() => setAddVisible(false)}/>
    }

  </div>;
}