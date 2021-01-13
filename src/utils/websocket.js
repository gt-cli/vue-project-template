import { getLocal } from './storage-helper'
import store from '@/store'
import * as types from '@/store/action-types'
class WS {
  constructor(config = {}) {
    this.url = config.url || 'localhost'
    this.port = config.port || 4000
    this.protocol = config.protocol || 'ws'
    this.time = config.time || 3000 * 10
  }
  create() {
    this.wsc = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.wsc.onopen = this.onOpen
    this.wsc.onmessage = this.onMessage
    this.wsc.onclose = this.onClose
    this.wsc.onerror = this.onError
  }
    onOpen = () => {
      this.wsc.send(JSON.stringify({
        type: 'auth',
        data: getLocal('token')
      }))
    }
    onClose = () => {
      this.wsc.close()
    }
    send = (msg) => {
      this.wsc.send(JSON.stringify(msg))
    }
    onMessage = (e) => {
      var { type, data } = JSON.parse(e.data)
      switch (type) {
        case 'noAuth':
          console.log('没权限')
          break
        case 'heartCheck':
          this.checkServer()
          this.wsc.send(JSON.stringify({ type: 'heartCheck' }))
          break
        default:
          if (data === 'auth ok') return
          store.commit(types.SET_MESSAGE, data)
      }
    }
    onError = () => {
      setTimeout(() => {
        this.create()
      }, 1000)
    }
    checkServer() {
      clearTimeout(this.handle)
      this.handle = setTimeout(() => {
        this.onClose()
        this.onError()
      }, this.time + 1000)
    }
}
export default WS
