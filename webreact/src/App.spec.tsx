import { describe, it, expect } from "vitest";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import App from "@/App";

describe('路由', () => {
  it('点击商品路由，进入商品页面', async () => {
    const {getByText} = render(<App/>)
    const link = getByText('商品管理')
    fireEvent.click(link);
    const addCommodityButton = screen.getByText('商品管理')
    expect(addCommodityButton).toBeInTheDocument()
  })

  it('输入组件测试地址，进入组件测试页面', async () => {
    window.history.pushState({}, '', '/components')
    const {getByText} = render(<App/>)
    const button = getByText('Primary')
    expect(button).toBeInTheDocument()
  })
})
