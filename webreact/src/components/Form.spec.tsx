import {render} from "@testing-library/react";
import {Form} from "@/components/Form";

describe("表单", () => {
  it('should 显示表单内容', function () {
    const {queryByRole,queryByText} = render(<Form>表单内容</Form>)
    expect(queryByRole("form")).toBeInTheDocument()
    expect(queryByText("表单内容")).toBeInTheDocument()
  });
})