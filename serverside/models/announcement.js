//define a schema/ blueprint NOTE: id is not a part of the schema
const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema({
  announcementTitle:  { type: String, required: true},
  announcementTopic:  { type: String, required: true},
  announcementDate:  { type: String, required: true}
});

//use the blueprint to create the model
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Announcement', announcementSchema,'Announcements');
//note capital S in the collection name


