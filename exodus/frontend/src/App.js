import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { StoreProvider } from "./context/StoreContext";
import PrivateRoute from "./utils/PrivateRoute";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import CongregationsPage from "./pages/CongregationsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CreateSermonPage from "./pages/CreateSermonPage";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <StoreProvider>
                        <NavigationProvider>
                            <Switch>
                                <Route component={LoginPage} path="/login" />
                                <Route component={DefaultRouterPages} />
                            </Switch>
                        </NavigationProvider>
                    </StoreProvider>
                </AuthProvider>
            </Router>
        </div>
    );
}

const DefaultRouterPages = () => (
    <div>
        <Navigation />
        <Route component={HomePage} path="/" exact />
        <Route component={CongregationsPage} path="/congregations" exact />
        <PrivateRoute component={ProfilePage} path="/profile" />
        <LocalizationProvider dateAdapter={DateAdapter}>
            <PrivateRoute component={CreateSermonPage} path="/createsermon" />
        </LocalizationProvider>
    </div>
);

export default App;
