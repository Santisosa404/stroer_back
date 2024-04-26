
const { addDataToFile } = require("../../services/trackService");
const client = require("../../redisConfig");
describe("TrackService test", () => {
  test("Should write the new data on the file", async () => {
    const mockData = {
      count: 1,
      orderNumber: "123456",
      id: "3456A",
      trackName: "Test name",
    };

    const mockFile = {
      count: 1,
      orderNumber: "123456",
      id: "3456A",
      trackName: "Test name",
    };
    const mockJsonDataPath = "data/testData.json";
    await addDataToFile(mockData, mockJsonDataPath);
    const testNewData = require("../../../data/testData.json");
    expect(testNewData.newTrack).toStrictEqual(mockFile);
  });

  test("Should faild because the data in the file is no equal to the data passed", async () => {
    const mockData = {
      count: 1,
      orderNumber: "123456",
      id: "3456A",
      trackName: "Test name",
    };

    const mockFile = {
      count: 1,
      orderNumber: "1256",
      id: "3456A",
      trackName: "Test name",
    };
    const mockJsonDataPath = "data/testData.json";
    await addDataToFile(mockData, mockJsonDataPath);
    const testNewData = require("../../../data/testData.json");
    expect(testNewData.newTrack).not.toStrictEqual(mockFile);
  });

  afterAll(async () => {
    await (await client).quit();
  });

});
