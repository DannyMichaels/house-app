import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import Header from './routes/Header'
import SignIn from './routes/SignIn'
import SignOut from './routes/SignOut'
import Landing from './routes/Landing'
import SignUp from './routes/SignUp'
import AuthenticatedRoute from './routes/AuthenticatedRoute'
import House from './routes/House'
import Houses from './routes/Houses'
import HouseCreate from './routes/HouseCreate'
import HouseEdit from './routes/HouseEdit'
import { getAllHouses } from '../api/houses'

export default class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            items: []
        }
    }

    async componentDidMount() {
        try {
            const houses = await getAllHouses()
            this.setState({ houses })
        } catch (err) {
            console.error(err)
        }
    }

    addItem = (house) => this.setState({ houses: [...this.state.houses, house] })

    setUser = (user) => this.setState({ user })

    clearUser = () => this.setState({ user: null })

    render() {
        const { user, houses } = this.state
        return (
            <>
                <Header user={user} />
                <main className='container'>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={(props) =>
                                user ? <Home /> : <Landing {...props} houses={houses} />
                            }
                        />
                        <Route
                            path='/sign-in'
                            render={(props) => <SignIn {...props} setUser={this.setUser} />}
                        />
                        <Route
                            path='/sign-up'
                            render={(props) => <SignUp {...props} setUser={this.setUser} />}
                        />
                        <Route
                            exact
                            path='/sign-out'
                            render={(props) => (
                                <SignOut {...props} clearUser={this.clearUser} user={user} />
                            )}
                        />
                        <AuthenticatedRoute
                            exact
                            path='/houses'
                            user={user}
                            render={(props) => <Houses {...props} user={user} houses={houses} />}
                        />
                        <AuthenticatedRoute
                            exact
                            path='/houses/:id'
                            user={user}
                            render={(props) => <House {...props} />}
                        />
                        <AuthenticatedRoute
                            exact
                            user={user}
                            path='/houses/:id/edit'
                            render={(props) => <HouseEdit {...props} />}
                        />
                        <AuthenticatedRoute
                            user={user}
                            path='/create'
                            render={(props) => (
                                <HouseCreate {...props} addHouse={this.addHouse} />
                            )}
                        />
                    </Switch>
                </main>
            </>
        )
    }
}