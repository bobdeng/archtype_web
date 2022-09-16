import {act, fireEvent, render, waitFor} from "@testing-library/react";
import {expect, vi} from "vitest";
import {AddCommodity} from "@/pages/commodity/AddCommodity";
import {inputChangeEvent} from "../../../test/tests";
import notifications from "@/components/notifications";
import {server} from "@/api/HttpServer";

describe('Add Commodity', () => {
  describe('Layout', () => {
    it('should has header for add commodity', () => {
      const {getByText} = render(<AddCommodity/>);
      expect(getByText("添加商品")).toBeInTheDocument();
    });

    it('should has input of url', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      expect(getByPlaceholderText("商品链接")).toBeInTheDocument();
    });

    it('should has input of id', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      expect(getByPlaceholderText("商品id")).toBeInTheDocument();
    });

    it('should has input of pic', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      expect(getByPlaceholderText("商品图片")).toBeInTheDocument();
    });

    it('should has input of shop name', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      expect(getByPlaceholderText("店铺名称")).toBeInTheDocument();
    });

    it('should has input of price', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      expect(getByPlaceholderText("商品价格")).toBeInTheDocument();
    });

    it('should trigger on close when click close', () => {
      const onClose = vi.fn();
      const {getByText} = render(<AddCommodity onClose={onClose}/>);
      fireEvent.click(getByText("关闭"))
      expect(onClose).toBeCalledTimes(1)
    });

  });

  describe('Interactions', () => {

    it('should set url value to state', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      const urlInput = getByPlaceholderText('商品链接');
      fireEvent.change(urlInput, inputChangeEvent('https://taobao.com/item=33422'));
      expect(urlInput).toHaveValue('https://taobao.com/item=33422')
    });

    it('should set id value to state', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      const idInput = getByPlaceholderText('商品id');
      fireEvent.change(idInput, inputChangeEvent('89900'));
      expect(idInput).toHaveValue('89900')
    });

    it('should set pic value to state', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      const picInput = getByPlaceholderText('商品图片');
      fireEvent.change(picInput, inputChangeEvent('https://taobao.com/item=33422.jpg'));
      expect(picInput).toHaveValue('https://taobao.com/item=33422.jpg')
    });

    it('should set shop name value to state', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      const shopNameInput = getByPlaceholderText('店铺名称');
      fireEvent.change(shopNameInput, inputChangeEvent('爱熹尔旗舰店'));
      expect(shopNameInput).toHaveValue('爱熹尔旗舰店')
    });

    it('should set price value to state', () => {
      const {getByPlaceholderText} = render(<AddCommodity/>);
      const priceInput = getByPlaceholderText('商品价格');
      fireEvent.change(priceInput, inputChangeEvent('299.88'));
      expect(priceInput).toHaveValue('299.88')
    });

    let button: Element;

    function setupForSubmit() {
      const rendered = render(<AddCommodity/>);

      const {getByPlaceholderText, getByRole, getByText} = rendered;
      const urlInput = getByPlaceholderText('商品链接');
      const idInput = getByPlaceholderText('商品id');
      const picInput = getByPlaceholderText('商品图片');
      const shopNameInput = getByPlaceholderText('店铺名称');
      const priceInput = getByPlaceholderText('商品价格');

      fireEvent.change(urlInput, inputChangeEvent('https://taobao.com/item=33422'));
      fireEvent.change(idInput, inputChangeEvent('89900'));
      fireEvent.change(picInput, inputChangeEvent('https://taobao.com/item=33422.jpg'));
      fireEvent.change(shopNameInput, inputChangeEvent('爱熹尔旗舰店'));
      fireEvent.change(priceInput, inputChangeEvent('299.88'));
      server.newCommodity = vi.fn().mockResolvedValue("")
      button = getByText('确定');
      return rendered;
    }

    it('should calls saveCommodity when fields are valid and actions are provided in props', () => {
      server.newCommodity = vi.fn().mockResolvedValue("")
      setupForSubmit();
      fireEvent.click(button);
      expect(server.newCommodity).toBeCalledTimes(1);
    });

    it('should calls saveCommodity with parameters', () => {
      setupForSubmit();
      fireEvent.click(button);
      expect(server.newCommodity).toBeCalledWith({
        "id": "89900",
        "pic": "https://taobao.com/item=33422.jpg",
        "price": "299.88",
        "shopName": "爱熹尔旗舰店",
        "url": "https://taobao.com/item=33422",
      })
    });

    it('如果不输入ID，提交内容为空', () => {
      const {getByPlaceholderText} = setupForSubmit();
      fireEvent.change(getByPlaceholderText("商品id"), inputChangeEvent(''));
      fireEvent.click(button);
      expect(server.newCommodity).toBeCalledWith({
        "id": "",
        "pic": "https://taobao.com/item=33422.jpg",
        "price": "299.88",
        "shopName": "爱熹尔旗舰店",
        "url": "https://taobao.com/item=33422",
      })
    });

    it('如果不输入价格，提交内容为空', () => {
      const {getByPlaceholderText} = setupForSubmit();
      fireEvent.change(getByPlaceholderText("商品价格"), inputChangeEvent(''));
      fireEvent.click(button);
      expect(server.newCommodity).toBeCalledWith({
        "id": "89900",
        "pic": "https://taobao.com/item=33422.jpg",
        "price": "",
        "shopName": "爱熹尔旗舰店",
        "url": "https://taobao.com/item=33422",
      })
    });

    function mockAsyncDelayed() {
      return vi.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 300)
        })
      });
    }

    it('should not allow user to click the save button when there is an ongoing api call', () => {

      setupForSubmit();
      fireEvent.click(button);
      fireEvent.click(button);
      expect(server.newCommodity).toBeCalledTimes(1);
    });

    describe('Save', function () {

      const getSpinner = (queryByText: any) => queryByText("Loading...");

      it('should display spinner when there is an ongoing api call', () => {
        const {queryByText} = setupForSubmit();
        fireEvent.click(button);
        expect(getSpinner(queryByText)).toBeInTheDocument();
      });

      it('should hide spinner after api call finishes successfully', async () => {
        const {queryByText} = setupForSubmit();
        fireEvent.click(button);
        await waitFor(() => expect(getSpinner(queryByText)).not.toBeInTheDocument())
      });

      it('should hide spinner after api call finishes with error', async () => {
        const {queryByText} = setupForSubmit();
        fireEvent.click(button);
        await waitFor(() => expect(getSpinner(queryByText)).not.toBeInTheDocument())
      });

    });

    it('保存成功后显示成功提示', async () => {
      const {queryByText} = setupForSubmit();
      notifications.closeAll();
      fireEvent.click(button);
      await waitFor(() => expect(queryByText("操作成功")).toBeInTheDocument())
    });

    it('保存成功后设置Url为空', async () => {
      const {queryByPlaceholderText} = setupForSubmit();
      notifications.closeAll();
      fireEvent.click(button);
      await waitFor(() => expect(queryByPlaceholderText("商品链接")).toHaveValue(""))
    });

    it('保存成功后设置Id为空', async () => {
      const {queryByPlaceholderText} = setupForSubmit();
      notifications.closeAll();
      fireEvent.click(button);
      await waitFor(() => expect(queryByPlaceholderText("商品id")).toHaveValue(""))
    });

    it('保存成功后设置图片为空', async () => {
      const {queryByPlaceholderText} = setupForSubmit();
      notifications.closeAll();
      fireEvent.click(button);
      await waitFor(() => expect(queryByPlaceholderText("商品图片")).toHaveValue(""))
    });

    it('保存成功后设置价格为空', async () => {
      const {queryByPlaceholderText} = setupForSubmit();
      notifications.closeAll();
      fireEvent.click(button);
      await waitFor(() => expect(queryByPlaceholderText("商品价格")).toHaveValue(""))
    });

    it('保存失败后提示失败信息', async () => {
      const {queryByText} = setupForSubmit();
      server.newCommodity = vi.fn().mockRejectedValue("内部错误")
      notifications.closeAll();
      fireEvent.click(button);
      await waitFor(() => expect(queryByText("内部错误")).toBeInTheDocument())
    });

  });
});