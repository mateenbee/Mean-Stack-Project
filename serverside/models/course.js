const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const courseSchema = new mongoose.Schema({
    courseNumber:  { type: String, required: true},
    courseTitle:  { type: String, required: true},
    instructor:  { type: String, required: true},
    semester:  { type: String, required: true},
    campus:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Course', courseSchema,'Courses');
//note capital S in the collection name