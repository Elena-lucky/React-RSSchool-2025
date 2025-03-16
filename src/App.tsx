import { Link } from 'react-router';
import { FormSubmitted } from './components/formComponents/FormSubmitted';

import './App.css';

function App() {
  return (
    <div className="main-wrapper">
      <p className="greeting">
        Hello! It takes a few minutes to fill in the forms. Are you ready?
      </p>
      <nav className="navigation">
        <Link to="/uncontrol" className="nav-link uncontrol">
          Uncontrolled form
        </Link>
        <Link to="/control" className="nav-link control">
          Controlled form
        </Link>
      </nav>
      <FormSubmitted />
    </div>
  );
}

export default App;
