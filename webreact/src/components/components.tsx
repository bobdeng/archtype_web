import {Button} from "@/components/Button";
import notifications from "@/components/notifications";

export function Components() {
  return <div>
    <div>按钮</div>
    <Button>Primary</Button>
    <Button type={'warning'}>Warning</Button>
    <Button type={'secondary'}>Secondary</Button>
    <Button size={"big"}>普通大按钮</Button>
    <Button size={"small"}>普通小按钮</Button>
    <Button loading={true}>加载中</Button>
    <div>消息提示</div>
    <Button onClick={() => notifications.success("一条成功的提示" + new Date())}>成功提示</Button>
    <Button onClick={() => notifications.error("一条失败的提示" + new Date())}>失败提示</Button>
    <Button onClick={() => notifications.closeAll()}>清除提示</Button>
  </div>
}