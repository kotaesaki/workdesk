import axios, { CancelTokenSource } from 'axios'

class RequestCanceler {
  private source: CancelTokenSource = axios.CancelToken.source()

  cancel() {
    this.source.cancel()
    this.source = axios.CancelToken.source()
  }

  token() {
    return this.source.token
  }
}
const requestCanceler = new RequestCanceler()

export {
  requestCanceler
}