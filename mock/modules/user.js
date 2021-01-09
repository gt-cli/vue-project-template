import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock('vue-project-template/user/get', 'get', () => {
  const users = []
  Random.increment(20)
  for (let i = 0; i < 10; i++) {
    users.push({
      id: i + 1,
      name: Random.name(),
      age: Random.increment(1)
    })
  }
  return {
    error: 0,
    code: 200,
    data: users,
    errorMsg: ''
  }
})

Mock.mock('vue-project-template/user/validate', 'get', () => {
  const users = {
    name: 'admin',
    token: Random.guid(),
    created: Random.date()
  }
  return {
    error: 0,
    code: 200,
    data: users,
    errorMsg: ''
  }
})

Mock.mock('vue-project-template/user/login', 'post', (data) => {
  console.log(data)
  const users = {
    name: 'admin',
    token: Random.guid(),
    created: Random.date()
  }
  return {
    error: 0,
    code: 200,
    data: users,
    errorMsg: ''
  }
})
