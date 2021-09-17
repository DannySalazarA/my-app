import React, { Component } from "react";
import TrueHomeService from "../services/true-home.service";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';

export default class Activity extends Component {
  constructor(props) {
    super(props);
    
    //this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getActivity = this.getActivity.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateScheduleActivitiy = this.updateScheduleActivitiy.bind(this);    
    this.updateStatusActivity = this.updateStatusActivity.bind(this);    
    this.onChangeSchedule = this.onChangeSchedule.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = {
        options:[],
      currentActivity: {
        id: null,
        property_id: null,
        schedule: null,
        title: "",
        created_at: null,
        status: ''
      },
      message: ""
    };
  }

  componentDidMount() {    
    this.getActivity(this.props.match.params.id);
  }

  onChangeTitle(e) {
     const title = e;

    this.setState(function(prevState) {
      return {
        currentActivity: {
          ...prevState.currentActivity,
          title: title
        }
      };
    });
  }

  onChangeSchedule(e) {
    const schedule = e;
    
    this.setState(function(prevState) {
        return {
          currentActivity: {
            ...prevState.currentActivity,
            schedule: schedule
          }
        };
      });
  }

  getActivity(id) {
    TrueHomeService.getActivity(id)
      .then(response => {
        this.setState({
          currentActivity: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentActivity.id,
      title: this.state.currentActivity.title,
      description: this.state.currentActivity.description,
      published: status
    };

    TrueHomeService.update(this.state.currentActivity.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentActivity: {
            ...prevState.currentActivity,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateScheduleActivitiy() {
    TrueHomeService.updateScheduleActivitiy(      
      this.state.currentActivity
    ).then(response => {
        console.log(response.data);
        this.setState({
          message: "The activity was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStatusActivity(status) {
    var data = {
        id: this.state.currentActivity.id,
        property_id: this.state.currentActivity.property_id,
        schedule: this.state.currentActivity.schedule,
        title: this.state.currentActivity.title,
        created_at: this.state.currentActivity.created_at,
        status: this.state.currentActivity.status        
      };

    TrueHomeService.updateStatusActivity(data)
    .then(response => {
        // this.setState(prevState => ({
        //     currentActivity: {
        //       ...prevState.currentActivity,
        //       status: status
        //     }
        //   }));
        console.log(response.data);
        this.setState({
            message: "The activity was updated successfully!"
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(e){
    this.setState(prevState => ({
                currentActivity: {
                    ...prevState.currentActivity,
                    status: e.value
                }
                }))
   }

  render() {
    const { currentActivity } = this.state;
    const options = [
        { value: 'Activa', label: 'Activa' },
        { value: 'Cancelada', label: 'Cancelada' },
        { value: 'Realizada', label: 'Realizada' }
      ]

    return (
      <div>
        {currentActivity ? (
          <div className="edit-form">
            <h4>Activity</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  readOnly='true'
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentActivity.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="schedule">Schedule</label>    
                <DateTimePicker onChange={this.onChangeSchedule}  value={new Date(currentActivity.schedule)} />
                
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  readOnly='true'
                  value={currentActivity.status}                  
                />
                
                <Select className="form-control"  options={options} onChange={this.handleChange.bind(this)}></Select>
              </div>
            </form>

            <div >
                <button
                type="submit"
                className="btn btn-success mt-2"
                onClick={this.updateScheduleActivitiy}
                >
                Update Schedule
                </button>
            </div>
            <div >
                <button
                type="submit"
                className="btn btn-success mt-2"
                onClick={this.updateStatusActivity}
                >
                Update Status
                </button>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Activity...</p>
          </div>
        )}
      </div>
    );
  }  
}