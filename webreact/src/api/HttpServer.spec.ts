import {describe, expect, test} from "vitest";
import {ajax} from "./HttpServer";

describe("ajax test", () => {

  test("axios返回错误", async (当) => {
    try {
      const result = await ajax(() => Promise.resolve({data: "错误", status: 400}))
      expect.fail("")
    } catch (e) {
      expect(e).toEqual("错误");
    }
  })

  test("axios返回字段检查错误", async (当) => {
    try {
      const result = await ajax(() => Promise.resolve({
        data: [{field: "name", error: "第一条错误"},
          {field: "name", error: "第二条错误"}], status: 400
      }))
      expect.fail("")
    } catch (e) {
      expect(e).toEqual("第一条错误；第二条错误");
    }
  })
  test("axios返回错误,无内容", async (当) => {
    try {
      await ajax(() => Promise.resolve({data: "", status: 400}))
      expect.fail("")
    } catch (e) {
      expect(e).toEqual(400);
    }
  })
  test("axios返回正常", async (当) => {
    const result = await ajax(() => Promise.resolve({data: {"result": 1}, status: 200}))
    expect(result).toEqual({"result": 1})
  })
})