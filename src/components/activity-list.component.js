import React, { Component } from "react";
import Select from 'react-select';
import TrueHomeService from "../services/true-home.service";
import { Link } from "react-router-dom";

export default class ActivitiesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveActivities = this.retrieveActivities.bind(this);
    this.retrieveProperties = this.retrieveProperties.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveActivity = this.setActiveActivity.bind(this);    
    this.searchTitle = this.searchTitle.bind(this);
    this.loadOptions = null;

    this.state = {
      Properties:[],
      Activities: [],
      currentActivity: null,
      currentIndex: -1,
      searchTitle: "",
      propertyId: null
    };
  }

  componentDidMount() {    
    this.retrieveActivities();    
    this.retrieveProperties();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveProperties() {    
        TrueHomeService.getAllProperties().
        then(response => {     
            const options = response.data.map(d => ({
                "value" : d.id,
                "label" : d.title          
              }))

            this.setState({
                Properties: options
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  
  retrieveActivities(propertyId) {
    TrueHomeService.getActivitiesByProp(propertyId)
      .then(response => {
        this.setState({
          Activities: response.data
        });
        //this.setActiveActivity()
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveActivities();
    this.setState({
      currentActivity: null,
      currentIndex: -1
    });
  }

  setActiveActivity(activity, index) {
    this.setState({
      currentActivity: activity,
      currentIndex: index
    });
  }

  searchTitle() {
    TrueHomeService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Activities: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(e){
    this.setState({propertyId:e.value})
    this.retrieveActivities(e.value);
   }

  render() {
    const { searchTitle, Activities, currentActivity, currentIndex } = this.state;
    
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3" style={{zIndex: '1000'}}>
            {/* <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            /> */}                                    
            <Select className="form-control"  options={this.state.Properties} onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="col-md-6">
          <h4>Activities List</h4>

          <ul className="list-group" style={{cursor: "pointer", zIndex: '1'}}>
            {Activities &&
              Activities.map((activity, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveActivity(activity, index)}
                  key={index}
                >
                  {activity.title}
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-6">
          {currentActivity ? (
            <div>
              <h4>Activities</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentActivity.title}
              </div>
              <div>
                <label>
                  <strong>Schedule:</strong>
                </label>{" "}
                {currentActivity.schedule}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentActivity.status}                
              </div>
              <div>
                <Link                
                    to={"/add/" + currentActivity.property_id+ "/"+ "test"}
                    className="link-primary">
                    Add
                </Link>
              </div>
              <Link                
                to={"/activities/" + currentActivity.id}
                className="link-primary">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Activity...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}