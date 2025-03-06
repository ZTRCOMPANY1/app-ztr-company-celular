document.addEventListener('DOMContentLoaded', function() {
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const coverImage = document.getElementById('cover');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const addToPlaylistButton = document.getElementById('add-to-playlist');
    const userName = document.getElementById('user-name');
    const userPlaylistCount = document.getElementById('user-playlist-count');

    const musicData = [
        { title: "Música 1", artist: "Artista 1", src: "musicas/musica.mp3", cover: "cards/cover.jpeg" },
        { title: "Música 2", artist: "Artista 2", src: "musicas/musica.mp3", cover: "cards/cover.jpeg" },
        { title: "Música 3", artist: "Artista 3", src: "musicas/musica.mp3", cover: "cards/cover.jpeg" }
    ];

    let currentTrackIndex = 0;
    let userPlaylist = [];

    function loadTrack(index) {
        const track = musicData[index];
        audioSource.src = track.src;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        coverImage.src = track.cover;
        audioPlayer.load();
    }

    function updatePlaylist() {
        playlist.innerHTML = '';
        musicData.forEach((music, index) => {
            const musicItem = document.createElement('div');
            musicItem.className = 'music-item';
            musicItem.textContent = music.title;
            musicItem.setAttribute('data-index', index);
            playlist.appendChild(musicItem);
        });
    }

    playlist.addEventListener('click', function(e) {
        if (e.target.classList.contains('music-item')) {
            currentTrackIndex = e.target.getAttribute('data-index');
            loadTrack(currentTrackIndex);
            audioPlayer.play();
        }
    });

    playButton.addEventListener('click', function() {
        audioPlayer.play();
    });

    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
    });

    prevButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : musicData.length - 1;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
    });

    nextButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex < musicData.length - 1) ? currentTrackIndex + 1 : 0;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
    });

    addToPlaylistButton.addEventListener('click', function() {
        const currentTrack = musicData[currentTrackIndex];
        if (!userPlaylist.includes(currentTrack)) {
            userPlaylist.push(currentTrack);
            userPlaylistCount.textContent = userPlaylist.length;
            alert(`${currentTrack.title} foi adicionado à sua playlist!`);
        } else {
            alert(`${currentTrack.title} já está na sua playlist!`);
        }
    });

    // Inicializa a playlist e carrega a primeira música
    updatePlaylist();
    loadTrack(currentTrackIndex);
});