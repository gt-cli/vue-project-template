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
    authList: [
      { auth: 'manager', id: 1, name: 'manager', path: '/manager', pid: '-1', role: '' }
    ],
    avatar: '',
    crated: Random.date(),
    exp: 1598450154,
    gender: -1,
    iat: 1598446105,
    name: 'admin',
    role: '5f3e2c3e1d73309876e088',
    status: 0,
    token: '5f3e2c3e1d73309876e088',
    updated: Random.date(),
    username: 'admin'
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
    authList: [],
    avatar: '',
    crated: Random.date(),
    exp: 1598450154,
    gender: -1,
    iat: 1598446105,
    name: 'admin',
    role: '5f3e2c3e1d73309876e088',
    status: 0,
    token: '5f3e2c3e1d73309876e088',
    updated: Random.date(),
    username: 'admin'
  }
  return {
    error: 0,
    code: 200,
    data: users,
    errorMsg: ''
  }
})
