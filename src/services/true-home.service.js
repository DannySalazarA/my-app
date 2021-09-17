import http from "../http-common";

class TrueHomeService {

  getAllProperties() {
    return http.get("/property/properties");
  }

  getAllActivities() {
    return http.get("/activity/activities");
  }

  getActivity(id) {
    return http.get(`/activity/activities/${id}`);
  }

  getActivitiesByProp(propertyId) {
    return http.get(`/activity/activitiesByProperty/${propertyId}`);
  }

  create(data) {
    return http.post("/activity/addActivities", data);
  }

  updateScheduleActivitiy(data) {
    return http.post("/activity/updateScheduleActivitiy", data);
  }

  updateStatusActivity(data) {
    return http.post("/activity/updateStatusActivity", data);
  }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TrueHomeService();