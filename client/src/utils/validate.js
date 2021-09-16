export default function validate(breeds) {
  let errors = {};
  let validateUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

  if (!breeds.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(breeds.name)) {
    errors.name = "The name can only be letters";
  } else if (breeds.name.length < 3) {
    errors.name = "Minimum 3 characters";
  } else if (breeds.name.length > 30) {
    errors.name = "Maximum 3 characters";
  }

  if (!breeds.weightMin) {
    errors.weightMin = "Minimum weight required";
  } else if (!/^\d+$/.test(breeds.weightMin)) {
    errors.weightMin = "Minimum weight required";
  } else if (breeds.weightMin < 0) {
    errors.weightMin = "It can not be so light at least 1 kg";
  } else if (breeds.weightMin > breeds.weightMax) {
    errors.weightMin = "It cannot be greater than the maximum weight";
  }
  if (!breeds.weightMax) {
    errors.weightMax = "Maximum weight required";
  } else if (breeds.weightMin[0] >= breeds.weightMax[0]) {
    errors.weightMax = "It cannot be less than the minimum weight";
  } else if (!/^\d+$/.test(breeds.weightMax)) {
    errors.weightMax = "Maximum weight required";
  } else if (breeds.weightMax > 110) {
    errors.weightMax = "It cannot be heavier than 110kg";
  }
  if (!breeds.heightMin) {
    errors.heightMin = "Minimum height required";
  } else if (!/^\d+$/.test(breeds.heightMin)) {
    errors.heightMin = "Minimum height required";
  } else if (breeds.heightMin < 9) {
    errors.heightMin = "It cannot be less than 9cm";
  } else if (breeds.heightMin > breeds.heightMax) {
    errors.heightMin = "It cannot be less than the maximum height";
  }
  if (!breeds.heightMax) {
    errors.heightMax = "Maximum height required";
  } else if (breeds.heightMin[0] >= breeds.heightMax[0]) {
    errors.heightMax = "It cannot be less than the minimum height";
  } else if (!/^\d+$/.test(breeds.heightMax)) {
    errors.heightMax = "Maximum height required";
  } else if (breeds.heightMax > 130) {
    errors.heightMax = "It cannot be greater than 130cm";
  }
  if (breeds.life_spanMin.length) {
    if (!/^\d+$/.test(breeds.life_spanMin)) {
      errors.life_spanMin = "Minimum life span required";
    } else if (breeds.life_spanMin < 0) {
      errors.life_spanMin = "Minimum 1 year";
    }
  }
  if (breeds.life_spanMax.length) {
    if (breeds.life_spanMin[0] >= breeds.life_spanMax[0]) {
      errors.life_spanMax = "It cannot be less than the minimum life span";
    } else if (!/^\d+$/.test(breeds.life_spanMax)) {
      errors.life_spanMax = "Maxium life span required";
    } else if (breeds.life_spanMax > 21) {
      errors.life_spanMin = "Maximum 21 year";
    }
  }
  if (breeds.image) {
    // if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(breeds.image)) 
    if(!validateUrl.test(breeds.image))
    {
      errors.image = "Insert a valid URL";
    }
  }
  // if(breeds.temperament.length){

  //   if (breeds.temperament.length > 5) {
  //     errors.temperament = "Maximum 5 temperaments";
  //   }
  // }
  return errors;
}
