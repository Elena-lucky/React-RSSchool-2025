import Search from './components/search/Search';
import './App.css';

function App() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };
  return (
    <>
      <div>
        <Search onSearchClick={handleSearch} />
      </div>
    </>
  );
}

export default App;
