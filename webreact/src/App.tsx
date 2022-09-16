import React from 'react'
import 'antd-mobile/es/global'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Components} from "@/components/components";
import {Commodities} from "@/pages/commodity/Commodities";

const Home = () => {
  return <div>
    <Link to="/commodities">商品管理</Link>
  </div>
}

const App = () => {
  return <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/commodities' element={<Commodities/>}/>
        <Route path='/components' element={<Components/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
}

export default App
