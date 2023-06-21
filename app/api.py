import requests

url = "https://spotify81.p.rapidapi.com/top_200_tracks"

headers = {
	"X-RapidAPI-Key": "494b68cc7amsh8ff7aa2b70dcfb7p1b6044jsnde39e29e002b",
	"X-RapidAPI-Host": "spotify-downloader1.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

print(response.json())
