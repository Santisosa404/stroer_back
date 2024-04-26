const { getCountController } = require("../../controllers/countController");
const { getCount } = require("../../services/countService");
const client = require("../../redisConfig");

jest.mock("../../services/countService");
jest.mock("../../redisConfig");

describe("CountController test", () => {
  test("It should succes and response with 200 status code", async () => {
    const mockCount = 10;
    getCount.mockResolvedValue(mockCount);
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getCountController(req, res);

    expect(getCount).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ count: mockCount });
  });

  afterAll(async () => {
    await (await client).quit();
  });

});
