import {useMutation, useQuery} from 'react-query'
import axios from 'axios'

export function get(url: string) {
  return useQuery([url], () => _get(url))
}

export function usePost(url: string, options?: any, key?: any) {
  return useMutation((data: object) => {
    return _post(url, data)
  }, options)
}

export function errorMessage(error: any, defaultErrorMessage = "请求错误，请稍后再试") {
  const response = (error as { response: any })?.response || {}
  const data = ((response as { data: any }))?.data || {}
  return ((data as { error_message: string }))?.error_message || defaultErrorMessage
}

async function _get(url: string) {
  const {data} = await axios.get(url)
  return data
}

const _post = async (url: string, data: object) => {
  const {data: response} = await axios.post(url, data)
  return response.data
}
