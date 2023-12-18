import React from "react";
import Person from "./Person";
import axios from "axios";

export default function PersonList() {

  const personAPI = (url='http://localhost:5233/api/Image/Save') =>{
    return {
      fetch: () => axios.get(url),
      create: newRecord => axios.post(url, newRecord),
      update: (id,updatedRecord) =>axios.put(url + id, updatedRecord),
      delete: id=> axios.delete(url + id)
    }
  } 
  const addOrEdit = (formData, onSuccess) => {
    personAPI().create(formData)
      .then(res => {
        console.log(res);
        onSuccess();
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid py-4">
          <div className="container text-center">
            <h1 className="display-4">Image Showing</h1>
            <p className="lead">
            </p>

          </div>
        </div>
      </div>
      <div className="col-md-4">
        <Person 
        addOrEdit= {addOrEdit}
        />
      </div>
      <div className="col-md-4">
        <div>List of persons</div>
      </div>
    </div>
  );
}
