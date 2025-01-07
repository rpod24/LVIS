

import React from 'react';
import { Helmet } from "react-helmet";
import TopNav from "./Components/Navbar/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

//Basic template for a page. This will be used to create new pages. The page will be created by the admin, and the admin will be able to add components to the page.
//Each page will have a unique URL, and the admin will be able to add components to the page by dragging and dropping them onto the page.
//The page will be saved as a JSON object, and the JSON object will be used to render the page. The JSON object will be stored in the database, and the page will be rendered using the JSON object.
//The JSON object will contain the components that are on the page, and the components will be rendered using the JSON object.
const Page = ({ components }) => {
    const location = useLocation();

    return (
        <div>
            <Helmet>
                <title>Dynamic Page</title>
            </Helmet>
            <TopNav />
            <div className="container">
                {components.map((component, index) => {
                    const Component = React.lazy(() => import(`./Components/${component.type}`));
                    return (
                        <React.Suspense fallback={<div>Loading...</div>} key={index}>
                            <Component {...component.props} />
                        </React.Suspense>
                    );
                })}
            </div>
        </div>
    );
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/page/:id" element={<Page components={[]} />} />
        </Routes>
    </Router>
);

export default App;
