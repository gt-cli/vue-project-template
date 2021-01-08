import axios from '../utils/axios'

export function getUserList() {
  return axios.get('vue-project-template/user/get')
}
