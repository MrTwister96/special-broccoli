import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './utils/PrivateRoute'
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from './pages/ProfilePage'

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Navigation />
                    <Route component={HomePage} path="/" exact />
                    <PrivateRoute component={ProfilePage} path="/profile" />
                    <Route component={LoginPage} path="/login" />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
