const client = require("../../redisConfig");
const { getCount } = require("../../services/countService");

describe("CountService tests",  () => {
  test("It should set the count to 0", async () => {
    await client.set("count", 0);
    const countResponse = await getCount();
    expect(countResponse).toBe("0");
  });

  test("It should increment the number of count and check the number of count", async () => {
    await client.incr("count", 1);
    const countResponse = await getCount();
    expect(countResponse).not.toBe("0");
  });

  afterAll(async () => {
    await client.quit();
  });

});
