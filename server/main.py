from flask import Flask, jsonify
import random

app = Flask(__name__)

# Hardcoded playlist data (simulating Spotify API response)
playlists = {
    '6UeSakyzhiEt4NB3UAd6NQ': [
        {'track': {'name': 'Boulevard of Broken Dreams'}},
        {'track': {'name': 'Mr. Brightside'}},
        {'track': {'name': 'Clocks'}},
        {'track': {'name': 'Take Me Out'}},
        {'track': {'name': 'Seven Nation Army'}}
    ]
}

@app.route('/random-track/<playlist_id>')
def random_track(playlist_id):
    global playlists
    tracks = playlists.get(playlist_id, [])
    if tracks:
        track = random.choice(tracks)["track"]
        return jsonify({"songTitle": track['name']})
    else:
        return jsonify({"message": "No tracks found in the playlist."}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)
