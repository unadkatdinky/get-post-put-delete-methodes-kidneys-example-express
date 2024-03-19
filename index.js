const express = require('express');
const app = express();

var user = {
    name: "dinky",
    kidneys: [{
        healthy: false,
    }]
};

const users = [user];

app.use(express.json());

app.get("/", function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/", function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done!"
    });
});

app.put("/", function(req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
    //updates all kidneys to be healthy.
});

app.delete("/", function(req, res) {
    //it should give error 411 if no unhealthy kidneys
    let atLeastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atLeastOneUnhealthyKidney = true;
            break; // Added break statement to exit loop when unhealthy kidney found
        }
    }
    if (!atLeastOneUnhealthyKidney) {
        res.status(411).json({ error: "No unhealthy kidneys found." }); // Added error status and message
        return; // Added return to exit the function
    }

    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true
            });
        }
    }
    users[0].kidneys = newKidneys;
    res.json({});
});

app.listen(3002);
