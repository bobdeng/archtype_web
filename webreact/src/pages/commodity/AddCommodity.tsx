import {useState} from "react";
import {Modal} from "@/components/Modal";
import {FormItem} from "@/components/FormItem";
import {Input} from "@/components/Input";
import notifications from "@/components/notifications";
import {server} from "@/api/HttpServer";
import {float, Float, int64, Int64} from "@/util/boxed";

export interface CommodityProps {
  url: string,
  id: number,
  pic: string,
  shopName: string,
  price: number
}

export interface AddCommodityProps {
  onClose?: () => void;
}

export function AddCommodity(props: AddCommodityProps) {

  const [url, setUrl] = useState<string>('');
  const [id, setId] = useState<Int64>(int64(NaN));
  const [pic, setPic] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');
  const [price, setPrice] = useState<Float>(float(NaN));

  function onSaveCommodity() {
    return server.newCommodity({url, id: id.toString(), pic, shopName, price: price.toString()})
      .then(() => {
        setUrl("");
        setId(int64(NaN));
        setPic("");
        setPrice(float(NaN));
        notifications.success("操作成功");
      }).catch((e) => {
      notifications.error(e.toString())
    })
  }

  function handleClose() {
    if (props.onClose) {
      props.onClose()
    }
  }

  return <div>
    <Modal title={"添加商品"} onConfirm={() => {
      return onSaveCommodity();
    }} onClose={() => handleClose()}>
      <div>
        <FormItem label={"商品链接"}>
          <Input onChange={e => setUrl(e.target.value)} placeholder={"商品链接"} value={url}/>
        </FormItem>
      </div>
      <div>
        <FormItem label={"商品id"}>
          <Input onChange={e => setId(int64(e.target.value))} placeholder={"商品id"} value={id.toString()}/>
        </FormItem>
      </div>
      <div>
        <FormItem label={"商品图片"}>
          <Input onChange={e => setPic(e.target.value)} placeholder={"商品图片"} value={pic}/>
        </FormItem>
      </div>
      <div>
        <FormItem label={"店铺名称"}>
          <Input onChange={e => setShopName(e.target.value)} placeholder={"店铺名称"}/>
        </FormItem>
      </div>
      <div>
        <FormItem label={"商品价格"}>
          <Input onChange={e => setPrice(float(e.target.value))} placeholder={"商品价格"} value={price.toString()}/>
        </FormItem>
      </div>
    </Modal>
  </div>
}