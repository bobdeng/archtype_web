import {fireEvent, render, waitFor} from "@testing-library/react";
import {Commodities} from "@/pages/commodity/Commodities";

describe("商品管理", () => {
  it('should 标题为商品管理', function () {
    const {getByText} = render(<Commodities/>)
    getByText("商品管理");
  });

  it('should 有新增按钮', function () {
    const {getByText} = render(<Commodities/>)
    getByText("新增")
  });

  it('should 显示新增对话框，When点击新增', function () {
    const {getByText, queryByText} = render(<Commodities/>)
    fireEvent.click(getByText("新增"))
    waitFor(() => expect(queryByText("添加商品")).toBeInTheDocument())
  });

  it('新增后点击关闭按钮关闭对话框', function () {
    const {getByText, queryByText} = render(<Commodities/>)
    fireEvent.click(getByText("新增"))
    fireEvent.click(getByText("关闭"))
    expect(queryByText("添加商品")).not.toBeInTheDocument();
  });
})