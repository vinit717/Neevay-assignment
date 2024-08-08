import SearchResultNavbar from './components/SearchResultNavbar';
import SearchResultFooter from './components/SearchResultFooter';
import SearchResultText from './components/SearchResultText';
import SearchResultCards from './components/SearchResultCards';
import SearchResultFilters from './components/SearchResultFilters';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="App h-screen">
      <SearchResults/>
      {/* <SearchResultNavbar/>
      <SearchResultText/>
      <div className='flex'>
      <SearchResultFilters/>
      <SearchResultCards/>
      </div>
      <SearchResultFooter/> */}
    </div>
  );
}

export default App;
