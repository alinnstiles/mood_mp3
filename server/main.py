from dotenv import load_dotenv
import os
import base64
from requests import post, get
import json
import random

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "client_credentials"
    }
    result = post(url, data=data, headers=headers)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def get_playlist_tracks(token, playlist_id):
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = get_auth_header(token)
    result = get(url, headers=headers)
    if result.status_code != 200:
        print(f"Failed to retrieve playlist tracks. Status code: {result.status_code}")
        return []

    json_result = json.loads(result.content)["items"]
    return json_result

# Playlist ID from the provided link
playlist_id = "6UeSakyzhiEt4NB3UAd6NQ"
token = get_token()
tracks = get_playlist_tracks(token, playlist_id)

if tracks:
    track = random.choice(tracks)["track"]
    print(track['name'])
else:
    print("No tracks found in the playlist.")

