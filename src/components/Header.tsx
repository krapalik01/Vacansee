import '../Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo"></div>
      <a href="#" className='group'>
        Вакансии FE <div className="blue"></div>
      </a>
      <a href="#" className='group'>
        <div className="profile"></div>
        Обо мне
      </a>
    </header>
  );
}

export default Header;
