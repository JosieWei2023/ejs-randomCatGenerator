import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.thecatapi.com";

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const APIKey = "live_mTJZFVMay01zaCe360dem4ofoGhQH9WhP8BlC7goXNhJ3XfIyhpFr3fY5ewXL0iS";
let response = {};

app.get("/", async (req, res) => {
    try {
        axios.defaults.headers.common['x-api-key'] = APIKey;
        // Generate a random number to get id
        const breeds = await axios.get(API_URL + "/v1/breeds");
        const random = Math.floor(Math.random() * breeds.data.length);

        // Get a random id
        response = breeds.data[random];

        res.render("index.ejs", { content: response });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/about", async (req, res) => {
    try {
        res.render("about.ejs", { content: response });
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});