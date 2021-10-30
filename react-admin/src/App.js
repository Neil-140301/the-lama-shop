import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './pages/UserList';
import User from './pages/User';
import NewUser from './pages/NewUser';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route exact path="/newUser">
                <NewUser />
              </Route>
              <Route exact path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route exact path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
        {!admin && <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
