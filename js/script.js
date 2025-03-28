/*---------------------------------------------------------------------------------------------*/
/*DOOM*/
/*---------------------------------------------------------------------------------------------*/
/*Botones Doom*/
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.neon-button');
    const stories = document.querySelectorAll('.story');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase 'active' de todos los botones
            buttons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase 'active' al botón clicado
            button.classList.add('active');

            // Ocultar todas las historias
            stories.forEach(story => story.classList.add('hidden'));
            // Mostrar la historia correspondiente
            const gameId = button.getAttribute('data-game');
            const selectedStory = document.getElementById(gameId);
            selectedStory.classList.remove('hidden');
        });
    });
});
/*Reproductor Doom*/
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del reproductor
    const audio = document.getElementById('doom-audio');
    const playPauseBtn = document.getElementById('play-pause');
    const rewindBtn = document.getElementById('rewind');
    const forwardBtn = document.getElementById('forward');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // Botones para las historias (código existente)
    const buttons = document.querySelectorAll('.neon-button');
    const stories = document.querySelectorAll('.story');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            stories.forEach(story => story.classList.add('hidden'));
            const gameId = button.getAttribute('data-game');
            const selectedStory = document.getElementById(gameId);
            selectedStory.classList.remove('hidden');
        });
    });

    // Funciones del reproductor de música
    // Actualizar la duración total cuando el audio esté cargado
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
    });

    // Actualizar la barra de progreso y el tiempo actual mientras se reproduce
    audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        progressBar.style.setProperty('--value', `${(audio.currentTime / audio.duration) * 100}%`);
    });

    // Cambiar el tiempo del audio al mover la barra de progreso
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });

    // Botón de play/pausa
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸'; // Cambia a pausa
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶'; // Cambia a play
        }
    });

    // Botón de retroceder 10 segundos
    rewindBtn.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // Botón de adelantar 10 segundos
    forwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    // Formatear el tiempo en minutos:segundos
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});