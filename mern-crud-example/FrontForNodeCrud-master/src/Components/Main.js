import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Our all component files
import ListNote from '../Components/ListNote';
import AddNote from '../Components/AddNote';
import EditNote from '../Components/EditNote';

class Main extends Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ListNote} />
                    <Route path='/notes' component={ListNote} />                    
                    <Route path='/notes/add' component={AddNote} />
                    <Route path='/notes/:id' component={EditNote} />
                </Switch>
            </main>
        );
    }
}

export default Main;
