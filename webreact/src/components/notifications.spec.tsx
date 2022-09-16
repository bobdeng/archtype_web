import {act, fireEvent, render, waitFor} from "@testing-library/react";
import App from "@/App";
import notifications from "@/components/notifications";
import {expect, vi} from "vitest";

describe("消息提示框", () => {
  it('should 显示消息提示框', function () {
    const {queryByText} = render(<App/>);
    notifications.closeAll()
    act(() => notifications.success("这是一条提示"));
    expect(queryByText("这是一条提示")).toBeInTheDocument();

  });

  it('should 显示成功消息图标 ', function () {
    const {queryByText} = render(<App/>);
    notifications.closeAll()
    act(() => notifications.success("这是一条提示"));
    expect(queryByText("Check icon")).toBeInTheDocument();

  });

  it('should 显示错误图标 ', function () {
    const {queryByText} = render(<App/>);
    notifications.closeAll()
    act(() => notifications.error("这是一条提示"));
    expect(queryByText("Warning icon")).toBeInTheDocument();

  });

  it('关闭所有提示', function () {
    const {queryByRole, queryByText} = render(<App/>);
    act(() => notifications.success("这是一条提示1"));
    notifications.closeAll()
    waitFor(() => expect(queryByText("这是一条提示")).not.toBeInTheDocument());
  });

  it('关闭所有提示', function () {
    const {getByRole, queryByText} = render(<App/>);
    notifications.closeAll()
    act(() => notifications.success("这是一条提示"));
    expect(queryByText("这是一条提示")).toBeInTheDocument();
    fireEvent.click(getByRole("notification:close"))
    expect(queryByText("这是一条提示")).not.toBeInTheDocument();
  });

  it('should 3秒后自动关闭', async function () {
    vi.useFakeTimers()
    const {queryByRole, queryByText} = render(<App/>);
    notifications.closeAll()
    act(() => notifications.success("这是一条提示"));
    waitFor(() => expect(queryByText("这是一条提示")).toBeInTheDocument());
    await vi.runAllTimers();
    expect(queryByText("这是一条提示")).not.toBeInTheDocument();
  });

})