import AddSuggestion from "./pages/addSuggestion";
import ShowSuggestion from "./pages/showSuggestion";
import Suggestion from "./pages/suggestion";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
   <Router>
      <Routes>
          <Route path="" element={<Suggestion/>}/>
          <Route path="/add-suggestion" element={<AddSuggestion/>}/>
          <Route path="/suggestion/:id" element={<ShowSuggestion/>}/>
      </Routes>
   </Router>
  );
}

export default App;
