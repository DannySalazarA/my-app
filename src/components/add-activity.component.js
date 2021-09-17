import React, { Component } from "react";
import TruHomeService from "../services/true-home.service";
import DateTimePicker from 'react-datetime-picker';

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSchedule = this.onChangeSchedule.bind(this);
    this.saveActivity = this.saveActivity.bind(this);
    this.newActivity = this.newActivity.bind(this);

    this.state = {
      
      id: null,
      property_id: null,
      propName: '',
      schedule: new Date(),
      title: '',
      created_at: new Date(),
      status: '',

      submitted: false
    };
  }

  componentDidMount() {    
      this.setState({property_id: this.props.match.params.propId, propName: this.props.match.params.propName});    
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeSchedule(e) {
     this.setState({
       schedule: e
     });
  }
  

  saveActivity() {
    var data = {      
      property_id: this.state.property_id,      
      schedule: this.state.schedule,
      title: this.state.title,
      created_at: this.state.created_at,
      status: 'Activa'
    };

    TruHomeService.create(data)
      .then(response => {
        this.setState(prevState => ({
            
              ...prevState,
              id: response.data.id,
              submitted: true
            
          }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newActivity(property_id) {
    this.setState({
        id: null,
        property_id: property_id,
        schedule: null,
        title: "",
        created_at: null,
        status: 'Activa',

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newActivity}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
            <label htmlFor="propertyName">Property</label>
              <input
                type="text"
                readOnly="true"
                className="form-control"
                id="propertyName"
                required
                value={this.state.property_id}                
                name="propertyName"
              />
              
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Schedule</label>              
              <DateTimePicker onChange={this.onChangeSchedule}  value={new Date(this.state.schedule)} />
            </div>

            <button onClick={this.saveActivity} className="btn btn-success mt-2">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}