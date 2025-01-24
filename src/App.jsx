import { BrowserRouter, Routes, Route, NavLink, useNavigate} from "react-router-dom"
import React, { useEffect, useState } from "react"
import {Register, Login} from "./Auth"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import UserSetting from './UserSetting.jsx';
import CreatePost from './CreatePost.jsx';

import './hamburger.css';

import UserInfo from './UserInfo.jsx';

import Logo from "./assets/Logo.png"
import MyBlog from "./MyBlog.jsx"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true);
  const [uuid, setUuid] = useState('')

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUuid(user.uid);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <header>
          <nav>
            <div className="dropdown">
                <input type="checkbox" id="dropdown-toggle" className="dropdown-toggle" />
                <label htmlFor="dropdown-toggle" className="dropdown-label">
                ☰
                </label>
                <div className="dropdown-content">
                    <menu className="menu">
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/categories">Categories</NavLink>
                    </li>
                  
                    {isLoggedIn ? (<>
                      <li><NavLink to="/Follow">I Follow</NavLink></li>
                      <li><NavLink to="/MyBlog">My Blog</NavLink></li>
                      <li><NavLink to="/UserSetting">Setting</NavLink></li>
                      </>
                      ) : (
                        <></>
                      )}
                    </menu>
                </div>
            </div>

            <menu className="deactivate">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/categories">Categories</NavLink>
              </li>
            
              {isLoggedIn ? (<>
                <li><NavLink to="/Follow">I Follow</NavLink></li>
                <li><NavLink to="/MyBlog">My Blog</NavLink></li>
                <li><NavLink to="/UserSetting">Setting</NavLink></li>
                </>
                ) : (
                  <></>
                )}
            
            </menu>

            {isLoggedIn ? (<menu>
                <li><UserInfo uuid={uuid}/></li>
                <li><img src={Logo} alt="Logo" /></li>
              </menu>) : (
              <menu>
                <li>
                  <NavLink to="/Register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/Login">Login</NavLink>
                </li>
                <li>
                  <img src={Logo} alt="Logo" />
                </li>
              </menu>)}
          </nav>
        </header>

        <Routes>

          {isLoggedIn ? (<>
            <Route path="/" element={<></>} />
            <Route path="/categories" element={<></>} />
            <Route path="/Follow" element={<></>} />
            <Route path="/CreatePost" element={<CreatePost uuid={uuid}></CreatePost>} />
            <Route path="/UserSetting" element={<UserSetting uuid={uuid} />} />
            <Route path="/MyBlog" element={<MyBlog></MyBlog>} />
            <Route path="/Register" element={<Register> </Register>} />
            </>
          ) : (<>
            <Route path="/" element={<></>} />
            <Route path="/categories" element={<></>} />
            <Route path="/Register" element={<Register> </Register>} />
            <Route path="/Login" element={<Login> </Login>} />
            </>
          )}
      
        </Routes>
        
        <footer>
          <p>email - firestudios@seznam.cz</p>
          <p>phone - +420 732 630 113</p>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;