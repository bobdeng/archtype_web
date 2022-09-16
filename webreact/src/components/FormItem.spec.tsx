import {render} from "@testing-library/react";
import {FormItem} from "@/components/FormItem";

describe("表单项", () => {
  it('should 显示Label', function () {
    const {queryByRole} = render(<FormItem label={"用户名"}/>)
    expect(queryByRole("label")).toHaveTextContent("用户名")
  });

  it('should 显示项目内容', function () {
    const {queryByRole} = render(<FormItem>
      <input role={"item"}/>
    </FormItem>)
    expect(queryByRole("item")).toBeInTheDocument()
  });

  it('label 应当指向 item的ID', function () {
    const {queryByRole} = render(<FormItem>
      <input role={"item"} id={"inputName"}/>
    </FormItem>)
    expect(queryByRole("label")).toHaveAttribute("for", "inputName")
  });

  it('label有多个内容', function () {
    const {queryByRole} = render(<FormItem>
      <input role={"item"} id={"inputName"}/>
      <input role={"item"} id={"inputName1"}/>
    </FormItem>)
    expect(queryByRole("label")).not.toHaveAttribute("for", "inputName")
  });


})