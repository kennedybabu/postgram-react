import React, {createContext,useMemo, useState} from 'react'
import NavigationBar from './Navbar'
import {ArrowLeftOutlined} from "@ant-design/icons"
import { useNavigate } from 'react-router-dom'
import Toaster from './Toaster'



export const Context = createContext('unknown')

const Layout = (props) => {
  const [toaster, setToaster] = useState({
    title:'',
    show: false,
    message: '',
    type: ''
  })

  const value = useMemo(() => ({toaster, setToaster}), [toaster])
  const {hasNavigationBack} = props
  const navigate = useNavigate()



  return (
    <Context.Provider value={value}>
        <NavigationBar />
        {hasNavigationBack && (
          <ArrowLeftOutlined 
          style={{
            color: '#0D6EFD',
            fontSize: '24px',
            marginLeft: '5%',
            marginTop: '1%'
          }}
          onClick={() => navigate(-1)}/>
        )}
        <div className="container m-5">{props.children}</div>
        <Toaster 
        title={toaster.title}
        type={toaster.type}
        message={toaster.message}
        showToast={toaster.show} 
        onClose={() => setToaster({...toaster, show: false})}

        />
        
    </Context.Provider>
  )
}

export default Layout