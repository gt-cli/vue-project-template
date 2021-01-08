import Mock from "mockjs";
const Random = Mock.Random;
Mock.mock("vue-project-template/user/get", "get", () => {
  let users = [];
  Random.increment(20);
  for (let i = 0; i < 10; i++) {
    users.push({
      id: i + 1,
      name: Random.name(),
      age: Random.increment(1)
    });
  }
  return {
    error: 0,
    code: 200,
    data: users,
    errorMsg: ""
  };
});
