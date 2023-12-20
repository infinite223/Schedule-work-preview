import "./../styles/navStyles.scss";
import logo from "../assets/icon.png";
import ChangesModal from "./ChangesModal";
import {useState} from "react";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="nav">
      {showModal && <ChangesModal setShowModal={setShowModal} />}

      <div className="nav_right">
        <img alt="logo" src={logo} className="nav__logo" />
        <div className="nav__header-container">
          <div className="nav__header">ScheduleWork</div>
          <div className="nav__secendHeader">Mobile app</div>
        </div>
      </div>

      <div className="nav_buttons">
        {/* <div className="nav__button" onClick={() => setShowModal(true)}>
          Najnowsze zmiany
        </div> */}

        {/* <a href={`/login`}>
            <div className='nav_loginButton'>
              Zaloguj się 
            </div>
          </a> */}
      </div>
    </div>
  );
};

export default Nav;
