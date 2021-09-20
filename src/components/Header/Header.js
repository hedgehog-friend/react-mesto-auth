import logo from "../../images/symbols_logo/logo_white.svg";

function Header() {
  return (
    <header className="header body__container">
      <a href="#" target="_self">
        <img className="header__logo" src={logo} alt="логотип" />
      </a>
    </header>
  );
}

export default Header;
