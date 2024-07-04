const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { google } = require("googleapis");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
//specify where to find the schema
const Course = require("./models/course");
const Discussion = require("./models/discussion");
const Announcement = require("./models/announcement");
const Assignment = require("./models/Assignment");
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
//connect and display the status
mongoose
  .connect(
    "mongodb+srv://${username}:${password}@slms.vqteqsv.mongodb.net/SLMS"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error connecting", err);
  });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
  console.log("This line is always called");
  res.setHeader("Access-Control-Allow-Origin", "*"); //can connect from any host
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, OPTIONS, DELETE"
  ); //allowable methods
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//in the app.get() method below we add a path for the course API
//by adding /course, we tell the server that this method will be called every time http://localhost:8000/courses is requested.
app.get("/courses", (req, res, next) => {
  //we will add an array named courses to pretend that we received this data from the database
  //call mongoose method find (MongoDB db.Courses.find())
  Course.find()
    //if data is returned, send data as a response
    .then((data) => res.status(200).json(data))
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

//serve incoming post requests to /courses
app.post("/courses", (req, res, next) => {
  // create a new course variable and save request’s fields
  const course = new Course({
    courseNumber: req.body.courseNumber,
    courseTitle: req.body.courseTitle,
    instructor: req.body.instructor,
    semester: req.body.semester,
    campus: req.body.campus,
  });
  //send the document to the database
  course
    .save()
    //in case of success
    .then(() => {
      console.log("Success");
    })
    //if error
    .catch((err) => {
      console.log("Error:" + err);
    });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/courses/:id", (req, res, next) => {
  Course.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

//serve incoming put requests to /courses
app.put("/courses/:id", (req, res, next) => {
  console.log("id: " + req.params.id);
  // check that the parameter id is valid
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    //find a document and set new course number, course title, instructor, semester and campus
    Course.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          courseNumber: req.body.courseNumber,
          courseTitle: req.body.courseTitle,
          instructor: req.body.instructor,
          semester: req.body.semester,
          campus: req.body.campus,
        },
      },
      { new: true }
    )
      .then((course) => {
        if (course) {
          //what was updated
          console.log(course);
        } else {
          console.log("no data exist for this id");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
});

//find a course based on the id
app.get("/courses/:id", (req, res, next) => {
  //call mongoose method findOne (MongoDB db.Courses.findOne())
  Course.findOne({ _id: req.params.id })
    //if data is returned, send data as a response
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

//Matt's Discussion CRUD
app.get("/discussions", (req, res, next) => {
  //call mongoose method find (MongoDB db.Courses.find())
  Discussion.find()
    //if data is returned, send data as a response
    .then((data) => res.status(200).json(data))
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

//serve incoming post requests to discussion
app.post("/discussions", (req, res, next) => {
  // create a new discussion variable and save request’s fields
  const discussion = new Discussion({
    discussionNumber: req.body.discussionNumber,
    discussionTitle: req.body.discussionTitle,
    instructor: req.body.instructor,
    topic: req.body.topic,
  });
  //send the document to the database
  discussion
    .save()
    //in case of success
    .then(() => {
      console.log("Success");
    })
    //if error
    .catch((err) => {
      console.log("Error:" + err);
    });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/discussions/:id", (req, res, next) => {
  Discussion.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

//serve incoming put requests to discussion
app.put("/discussions/:id", (req, res, next) => {
  console.log("id: " + req.params.id);
  // check that the parameter id is valid
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Discussion.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          discussionNumber: req.body.discussionNumber,
          discussionTitle: req.body.discussionTitle,
          instructor: req.body.instructor,
          topic: req.body.topic,
        },
      },
      { new: true }
    )
      .then((discussion) => {
        if (discussion) {
          //what was updated
          console.log(discussion);
        } else {
          console.log("no data exist for this id");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
});

//find a discussion based on id
app.get("/discussions/:id", (req, res, next) => {
  //call mongoose method findOne (MongoDB db.Discussions.findOne())
  Discussion.findOne({ _id: req.params.id })
    //if data is returned, send data as a response
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

//Eturntiee's Announcements
app.get("/announcements", (req, res, next) => {
  //call mongoose method find (MongoDB db.Announcements.find())
  Announcement.find()
    //if data is returned, send data as a response
    .then((data) => res.status(200).json(data))
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

//serve incoming post requests to announcement
app.post("/announcements", (req, res, next) => {
  // create a new announcement variable and save request’s fields
  const announcement = new Announcement({
    announcementTitle: req.body.announcementTitle,
    announcementTopic: req.body.announcementTopic,
    announcementDate: req.body.announcementDate,
  });
  //send the document to the database
  announcement
    .save()
    //in case of success
    .then(() => {
      console.log("Success");
    })
    //if error
    .catch((err) => {
      console.log("Error:" + err);
    });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/announcements/:id", (req, res, next) => {
  Announcement.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

//serve incoming put requests to Announcement
app.put("/announcements/:id", (req, res, next) => {
  console.log("id: " + req.params.id);
  // check that the parameter id is valid
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Announcement.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          announcementTitle: req.body.announcementTitle,
          announcementTopic: req.body.announcementTopic,
          announcementDate: req.body.announcementDate,
        },
      },
      { new: true }
    )
      .then((announcement) => {
        if (announcement) {
          //what was updated
          console.log(announcement);
        } else {
          console.log("no data exist for this id");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
});

//find a announcement based on id
app.get("/announcements/:id", (req, res, next) => {
  //call mongoose method findOne (MongoDB db.Announcements.findOne())
  Announcement.findOne({ _id: req.params.id })
    //if data is returned, send data as a response
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

//Mateen's Assignments
app.get("/assignments", (req, res) => {
  Assignment.find()
    .then((assignments) => {
      res.status(200).json(assignments);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res
        .status(500)
        .json({ message: "Error fetching assignments", error: err });
    });
});

app.get("/assignments/:id", (req, res) => {
  Assignment.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res.status(500).json(err);
    });
});

app.post("/assignments", (req, res) => {
  console.log("hi");

  const assignment = new Assignment({
    assignmentName: req.body.assignmentName,
    dueDate: req.body.dueDate,
    grade: req.body.grade,
  });

  assignment
    .save()
    .then(() => {
      res.status(201).json(assignment);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res.status(500).json(err);
    });
});

app.delete("/assignments/:id", (req, res) => {
  Assignment.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "Deleted successfully!" });
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res.status(500).json(err);
    });
});

app.put("/assignments/:id", (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Assignment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then((assignment) => {
        if (assignment) {
          res.status(200).json(assignment);
        } else {
          res.status(404).json({ message: "No data exist for this id" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: "Please provide a correct ID." });
  }
});
const { authenticate } = require("@google-cloud/local-auth");
const serviceAccount = require("./slms-421517-6c23d6b8c971.json");
console.log(serviceAccount, "");

const credentialsPath = path.join(__dirname, "slms-421517-6c23d6b8c971.json");
console.log(credentialsPath);
const youtube = google.youtube({
  version: "v3",
  // key: 'AIzaSyDfw-zpQQDtBZNT9IzRYFuMuDFaaqLf2Gc'
  // key: 'AIzaSyD1cQLXabot-euHHn5UHoIcXEjoPxtB6xk'
  // auth: 'AIzaSyCbnj_kb99MZZx786MEfJbQBHxGO1XOIOI',
  // credentials: JSON.parse(fs.readFileSync(credentialsPath)),
  auth: new google.auth.GoogleAuth({
    credentials: serviceAccount,
    // keyfilePath: credentialsPath,
    scopes: [
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtube",
    ],
  }),
});
const upload = multer({ dest: "uploads/" });

app.post("/uploadVideo", upload.single("video"), async (req, res) => {
  try {
    // const auth = await authenticate({
    //     keyfilePath: credentialsPath,
    //     scopes: [
    //       'https://www.googleapis.com/auth/youtube.upload',
    //       'https://www.googleapis.com/auth/youtube',
    //     ],
    //   });
    //   google.options({auth});
    // const { title, description } = req.body;
    // console.log(req.file);
    // const filePath = req.file.path;
    // const res = await youtube.videos.insert({
    //   part: "snippet,status",
    //   requestBody: {
    //     snippet: {
    //       title: title,
    //       description: description,
    //     },
    //     status: {
    //       privacyStatus: "private", // Change to 'public' if you want the video to be publicly visible
    //     },
    //   },
    //   media: {
    //     body: fs.createReadStream(filePath),
    //   },
    // });
    // console.log("Video uploaded:", res.data);
    // fs.unlinkSync(filePath);
    return res.status(200).json({ message: "Video uploaded successfully." });
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
});

//to use this middleware in other parts ofthe application
module.exports = app;
