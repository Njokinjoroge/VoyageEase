import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelPlanForm from './components/TravelPlanForm';
import Home from './components/Home';
import NotFound from './components/NotFound';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<TravelPlanForm />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
