import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import Delete from './Delete';

var divStyle = {
    margin: '8% 8%',
};

class ListNote extends Component {

    constructor(props) {
        super(props);
        this.delete = new Delete();
        this.state = {
            notes: []
        }
        this.deleteNote = this.deleteNote.bind(this);
    }

    componentDidMount = () => {
        this.getList();
    }

    //To get all the employees
    getList() {
        axios.get('http://localhost:3000/notes')
            .then((response) => {
                console.log(response);
                this.setState({
                    notes: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // To delete any employee
    deleteNote(empid) {
        this.delete.deleteNote(empid);
        this.getList();
    }

    render() {
        const { notes } = this.state;
        return (
            <div style={divStyle}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>content</th>
                            <td><a href="/notes/add">Add</a></td>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* <a href="/addEmployee"><button>add new</button></a> */}
                    <tbody>
                        {
                            notes && notes.map((note, _id) => {
                                return (
                                    <tr key={_id}>
                                        <td>{_id}</td>
                                        <td>{note.title}</td>
                                        <td>{note.content}</td>
                                        {/* <td>{note.email}</td>
                                        <td>{note.phone}</td> */}
                                        <td>
                                            <Link to={"/notes/" + note._id} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td>
                                            <Button onClick={() => this.deleteNote(note._id)} bsStyle="danger" >Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListNote;
