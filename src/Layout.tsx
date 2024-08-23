import { Outlet } from "react-router-dom"
import Header from "./Routes/Header"

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout