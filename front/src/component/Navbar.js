import React from 'react'
import Nav from 'react-bootstrap/Nav';
import  {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const navigate = useNavigate()

    const goHome = () =>{
        navigate('/')
    }
    const goLogin = () =>{
        navigate('/login')
    }
    const goMembership = () =>{
        navigate('/Membership')
    }

  return (
      <Nav className="nav" activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
      <Button variant="outline-primary" onClick={goHome}>Home</Button>
      <Button variant="outline-primary" onClick={goLogin}>Login</Button>
      <Button variant="outline-primary" onClick={goMembership}>Register</Button>
    </Nav>
  );
/*    <div className='Navbar'>
        Navbar
    </div>
  )
  */
}

export default Navbar