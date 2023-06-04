import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Music from './pages/Music';
import FavoriteSongs from './pages/FavoriteSongs';
import FavoriteAlbums from './pages/FavoriteAlbums';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Loading from './pages/Loading';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      login: false,
    };

    this.onCreateUser = this.onCreateUser.bind(this);
    this.onChangeLoading = this.onChangeLoading.bind(this);
  }

  onChangeLoading() {
    const { loading } = this.state;
    if (loading) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
    }
    console.log('onChangeLoading', loading);
  }

  async onCreateUser(object) {
    this.onChangeLoading();
    await createUser(object);
    this.onChangeLoading();
    this.setState({
      login: true,
    });
  }

  render() {
    const { loading, login } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          { loading ? (
            <Route path="/" render={ () => <Loading /> } />
          ) : (
            <>
              <Route
                exact
                path="/"
                render={ () => (login ? <Redirect to="/search" /> : <Login
                  onCreateUser={ this.onCreateUser }
                />) }
              />
              <Route path="/loading/:id?" render={ (props) => <Loading { ...props }/> } />
              <Route
                path="/search"
                render={ (props) => (<Search { ...props }/>) }
              />
              <Route
                path="/album/:id?"
                render={ (props) => (<Album { ...props } />) }
              />
              <Route
                exact
                path="/favorite/Songs"
                render={ (props) => (<FavoriteSongs { ...props }/>) }
              />
              <Route
                path="/favorites/Albums"
                render={ (props) => (<FavoriteAlbums { ...props }/>) }
              />
              <Route
                path="/music/:origem?"
                render={ (props) => (<Music { ...props }/>) }
              />
              <Route
                exact
                path="/profile"
                render={ (props) => (<Profile { ...props }/>) }
              />
              <Route
                path="/profile/edit"
                render={ (props) => (<ProfileEdit { ...props }/>) }
              />
              <Route render={ () => <NotFound /> } />

            </>)}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
