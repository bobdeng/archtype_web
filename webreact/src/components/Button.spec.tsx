import { fireEvent, render } from "@testing-library/react";
import { Button } from "@/components/Button";
import { vi } from "vitest";


describe("按钮组件", () => {

  it('should has button item', function () {
    const {getByRole} = render(<Button/>)
    expect(getByRole("button")).toBeInTheDocument()
  });

  it('button should has click property', function () {
    const onClick = vi.fn().mockReturnValue("");
    const {getByRole} = render(<Button onClick={onClick}/>)
    fireEvent.click(getByRole("button"))
    expect(onClick).toBeCalledTimes(1)
  });

  it('should disabled button when Button is disabled', function () {
    const {getByRole} = render(<Button disabled={true}/>)
    const button = getByRole("button");
    expect(button).toBeDisabled()
  });

  it('should pass text to button', function () {
    const {getByRole} = render(<Button>按钮</Button>)
    const button = getByRole("button");
    expect(button).toHaveTextContent("按钮")
  });

  it('should should loading and disabled when loading', function () {
    const {getByRole} = render(<Button loading={true}>按钮</Button>)
    const button = getByRole("button");
    expect(button).toBeDisabled()
  });

  it('should should loading  ', function () {
    const {getByRole} = render(<Button loading={true}>按钮</Button>)
    const loading = getByRole("button:spinner");
    expect(loading).toBeInTheDocument()
  });

  it('should not should loading  ', function () {
    const {queryByRole} = render(<Button>按钮</Button>)
    expect(queryByRole("button:spinner")).not.toBeInTheDocument()
  });

  it('should has primary class when type is primary', function () {
    const {getByRole} = render(<Button type={"primary"}/>)
    expect(getByRole("button")).toHaveClass("bg-blue-600")
  });

  it('should has primary class when type is secondary', function () {
    const {getByRole} = render(<Button type={"secondary"}/>)
    expect(getByRole("button")).toHaveClass("bg-purple-600")
  });

  it('should has px-4 py-1.5 when small', function () {
    const {getByRole} = render(<Button size={"small"}/>)
    expect(getByRole("button")).toHaveClass("px-4")
    expect(getByRole("button")).toHaveClass("py-1.5")
  });

  it('should has px-6 py-2.5 when normal', function () {
    const {getByRole} = render(<Button size={"normal"}/>)
    expect(getByRole("button")).toHaveClass("px-6")
    expect(getByRole("button")).toHaveClass("py-2.5")
  });

  it('should has px-6 py-2.5 when default', function () {
    const {getByRole} = render(<Button />)
    expect(getByRole("button")).toHaveClass("px-6")
    expect(getByRole("button")).toHaveClass("py-2.5")
  });

  it('should has px-7 py-3 when big', function () {
    const {getByRole} = render(<Button size={"big"}/>)
    expect(getByRole("button")).toHaveClass("px-7")
    expect(getByRole("button")).toHaveClass("py-3")
  });

  it('should has primary class when type is warning', function () {
    const {getByRole} = render(<Button type={"warning"}/>)
    expect(getByRole("button")).toHaveClass("bg-yellow-500")
  });
})