// src/components/Layout.jsx
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="section">
        <Navbar />
        {/* <Sidebar /> */}
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout