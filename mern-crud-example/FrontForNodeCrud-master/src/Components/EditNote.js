import React, { Component } from 'react';
import axios from 'axios';

const customStyle = {
  width: '300px',
  margin: '0 auto'
}

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }

  componentDidMount = () => {
    this.getNoteById();
  }

  // To get employee based on ID
  getNoteById() {
    axios.get('http://localhost:3000/notes/' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          content: response.data.content
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // To update the record on submit
  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content } = this.state;
    axios.post('http://localhost:3000/notes/' + this.props.match.params.id, {
      title: title,
      content: content
    })
      .then((response) => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="container">
        <form style={customStyle} onSubmit={this.handleSubmit}>
          <label>
            title
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            content
            <input
              name="content"
              type="text"
              value={this.state.content}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <input
            type="submit"
            value="submit"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}

export default EditNote;
