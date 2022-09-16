import {fireEvent, render, waitFor} from "@testing-library/react";
import {Modal} from "@/components/Modal";
import {expect, vi} from "vitest";

describe("对话框", () => {

  it('should 显示对话框，当对话框初始化显示', function () {
    const {queryByText} = render(
      <Modal title={"对话框标题"} visible={true}/>
    )
    expect(queryByText("对话框标题")).toBeInTheDocument()
  });

  it('should 关闭对话框，当点击 关闭 按钮', function () {
    const onClose = vi.fn()
    const {getByText} = render(
      <Modal title={"对话框标题"} visible={true} onClose={() => onClose()}>这里是对话框内容</Modal>
    )
    fireEvent.click(getByText("关闭"))
    expect(onClose).toBeCalledTimes(1)
  });

  it('should 关闭对话框，当点击右上方X按钮', async function () {
    const onClose = vi.fn()
    const {getByRole} = render(
      <Modal title={"对话框标题"} visible={true} onClose={() => onClose()}>这里是对话框内容</Modal>
    )
    fireEvent.click(getByRole("modal:close"))
    expect(onClose).toBeCalledTimes(1)
  });

  it('should 关闭对话框，当里面的内容触发了关闭', async function () {
    const mockOnConfirm = vi.fn()
    const {queryByText, getByText} = render(
      <Modal title={"对话框标题"} visible={true} onConfirm={mockOnConfirm}></Modal>
    )
    fireEvent.click(getByText("确定"))
    expect(mockOnConfirm).toBeCalledTimes(1)
  });

  it('should 显示Loading，当点击了确定', async function () {
    const mockOnConfirm = async () => new Promise((resolve) => {
      resolve(true)
    });
    const {queryByRole, getByText} = render(
      <Modal title={"对话框标题"} visible={true} onConfirm={mockOnConfirm}></Modal>
    )
    fireEvent.click(getByText("确定"))
    await waitFor(() => expect(queryByRole("button:spinner")).toBeInTheDocument())
    await waitFor(() => expect(queryByRole("button:spinner")).not.toBeInTheDocument())
  });



})