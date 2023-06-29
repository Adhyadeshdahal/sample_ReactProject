import Joi from "joi";

export function Validate(fieldValues) {

    const schema = Joi.object(
        {
            title:Joi.string().required().max(30).min(3).regex(/^[a-zA-Z0-9\s]*$/).allow(''),
            numberInStock:Joi.number().required().min(1),
            dailyRentalRate:Joi.number().required().min(1).max(11),
            genreId:Joi.required()
  
        }
        )
        .options({abortEarly:false});
  
    const {error}= schema.validate(fieldValues);
  
    let err ={title:"",numberInStock:"",dailyRentalRate:"",genre:""};
  
    if (error) {
      error.details.forEach(e => {
        const message = e.message;
  
        if (e.path[0] === "title") {
          err["title"] = message;
        } else if (e.path[0] === "numberInStock") {
          err["numberInStock"] = message;
        } else if (e.path[0] === "dailyRentalRate") {
          err["dailyRentalRate"] = message;
        }
        else if (e.path[0] === "genre") {
          err["genre"] = message;
        }
      });
    }else{
      err= null;
    }
    //   setIsDisabled(!!error);
        return err;
   
  
  
     }