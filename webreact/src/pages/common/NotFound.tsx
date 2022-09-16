import { useEffect } from "react"
import { ErrorBlock } from 'antd-mobile'

export default function() {
  useEffect(() => {
    document.title = '404 Not Found'
  }, [])
  return (
    <ErrorBlock
      fullPage
      status='disconnected'
      title={<span>404</span>}
      description={<span>WAHT！？页面竟然飞走了。。。</span>}
    />
  )
}
