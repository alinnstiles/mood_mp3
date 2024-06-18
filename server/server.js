require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function getToken() {
    try {
        const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
        const encodedAuthString = Buffer.from(authString).toString('base64');
        const config = {
            headers: {
                Authorization: `Basic ${encodedAuthString}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const data = "grant_type=client_credentials";
        const response = await axios.post("https://accounts.spotify.com/api/token", data, config);
        return response.data.access_token;
    } catch (error) {
        throw new Error("Failed to fetch access token from Spotify API");
    }
}

async function getPlaylistTracks(accessToken, playlistId) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, config);
        return response.data.items;
    } catch (error) {
        throw new Error(`Failed to fetch playlist tracks from Spotify API: ${error.message}`);
    }
}

app.get("/random-track/:playlistId", async (req, res) => {
    const playlistId = req.params.playlistId;

    try {
        const accessToken = await getToken();
        const tracks = await getPlaylistTracks(accessToken, playlistId);

        if (tracks.length > 0) {
            const randomTrack = tracks[Math.floor(Math.random() * tracks.length)].track;
            res.json(randomTrack); // Send the random track as JSON response
        } else {
            res.status(404).json({ error: "No tracks found in the playlist." });
        }
    } catch (error) {
        console.error("Error retrieving random track:", error);
        res.status(500).json({ error: "Failed to retrieve random track." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
