import React, { useState } from "react";

const defaultImageSrc = "/img/Picture.jpg";

const initialFieldValues = {
  personId: 0,
  personName: "",
  occupation: "",
  image_Name: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Person(props) {
  const { addOrEdit } = props;
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.personName = values.personName.trim() === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    showPreview({ target: { files: [] } }); 
    setErrors({});
  };

const handleFormSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    const formData = {
      personId: values.personId,
      personName: values.personName,
      occupation: values.occupation,
      image_Name: values.image_Name,
      imageFile: values.imageFile,
    };

    addOrEdit(formData, resetForm);
  }
};

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">Person's Information</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" alt="Preview" />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                name="imageFile"
                onChange={showPreview}
              />
            </div>
            <div className="form-group">
              <input
                className={
                  "form-control " + applyErrorClass("personName")
                }
                placeholder="Name"
                name="personName"
                value={values.personName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
