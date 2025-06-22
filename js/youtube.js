const API_KEY = "AIzaSyAfzLENLSPtDr_1n6wfeQg7ieRjhbL3g3U";
const CHANNEL_ID = 'UCrxBKqFuIMHCIjp8R19axlA';
const MAX_RESULTS = 6;
const videoContainer = document.getElementById('video-container');

fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${MAX_RESULTS}`)
    .then(response => response.json())
    .then(data => {
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.title = `YouTube video player – ${item.snippet.title}`; // 👈 Adds a descriptive title
            videoContainer.appendChild(iframe);
        });
    })
    .catch(err => {
        videoContainer.innerHTML = '<p style="color:#ccc; text-align:center">Unable to load videos at the moment.</p>';
        console.error('YouTube API error:', err);
    });