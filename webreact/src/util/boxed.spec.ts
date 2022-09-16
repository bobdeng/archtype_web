import {float, int64} from "@/util/boxed";

describe("包装类型测试", () => {
  it('如果number有值，toString返回数值的字符串', function () {
    const number = int64(100);
    expect(number.toString()).toEqual("100")
  });

  it('输入字符串得到integer，toString返回数值的字符串', function () {
    const number = int64("100");
    expect(number.toString()).toEqual("100")
  });

  it('如果number没有值，toString返回空字符串', function () {
    const number = int64(NaN);
    expect(number.toString()).toEqual("")
  });

  it("如果浮点数有值，返回字符串", () => {
    const number = float(3.14159);
    expect(number.toString()).toEqual("3.14159")
  })

  it("浮点数处理字符串，返回字符串", () => {
    const number = float("3.14159");
    expect(number.toString()).toEqual("3.14159")
  })

  it("浮点数处理字符串，返回字符串", () => {
    const number = float("3.");
    expect(number.toString()).toEqual("3.")
  })

  it("如果输入的不是浮点数，清空", () => {
    const number = float("a3.ab");
    expect(number.toString()).toEqual("")
  })

  it("如果输入的浮点数带小数点，保留", () => {
    const number = float("3.ab");
    expect(number.toString()).toEqual("3.ab")
  })

  it("如果浮点数是NaN，字符串返回空", () => {
    const number = float(NaN);
    expect(number.toString()).toEqual("")
  })
})