import { Link } from 'react-router';
import './App.css';

function App() {
  return (
    <div>
      <p className="greeting">
        Hello! It takes a few minutes to fill in the forms. Are you ready?
      </p>
      <nav className="navigation">
        <Link to="/uncontrol" className="nav-link uncontrol">
          Uncontrol form
        </Link>
        <Link to="/control" className="nav-link control">
          Control form
        </Link>
      </nav>
    </div>
  );
}

export default App;
