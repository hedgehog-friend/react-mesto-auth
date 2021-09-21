import logo from "../../images/symbols_logo/logo_white.svg";

function Header(props) {
  return (
    <header className="header body__container">
      <a href="#" target="_self">
        <img className="header__logo" src={logo} alt="логотип" />
      </a>
      {props.children}
    </header>
  );
}

export default Header;
