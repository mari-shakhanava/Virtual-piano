const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnContainer = document.querySelector('.btn-container');
const btnsNotesLetters = document.querySelectorAll('.btn');
const btnFullScreen = document.querySelector('.fullscreen');
let isMousedown = false;
let isMouseup = false;

//Notes to Letters Switcher
const notesLettersSwitcher = (event) => {
    if (event.target.classList.contains('btn')) {
        btnsNotesLetters.forEach((el) => {
            if (el.classList.contains('btn-active')) {
                el.classList.remove('btn-active');
            }
        });
        event.target.classList.add('btn-active');
    }

    if (event.target.classList.contains('btn-active') &&
        event.target.classList.contains('btn-letters')) {
        pianoKeys.forEach((el) => {
            el.classList.add('piano-key-letter');
        });
    }

    if (event.target.classList.contains('btn-active') &&
        event.target.classList.contains('btn-notes')) {
        pianoKeys.forEach((el) => {
            el.classList.remove('piano-key-letter');
        });
    }
}

btnContainer.addEventListener('click', notesLettersSwitcher);

//Playing Audio
const playAudio = (src) => {
    const audio = new Audio(src);
    audio.currentTime = 0;
    // audio.loop = false;
    audio.play();
}

const srcMaking = (event) => {
    if (event.target.classList.contains('piano-key')) {
        const noteDataAudio = event.target.dataset.note;
        const src = `assets/audio/${noteDataAudio}.mp3`;
        playAudio(src);
    }
}

const mouseClickPlaying = (event) => {
        isMousedown = true;
        isMouseup = false;
        srcMaking(event);
        event.target.classList.add('piano-key-active');
        event.target.classList.add('piano-key-active-pseudo');
}

piano.addEventListener('mousedown', mouseClickPlaying);

window.addEventListener('mouseup', (event) => {
    isMouseup = true;
    isMousedown = false;
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
 })

piano.addEventListener('mouseout', (event) => {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
})

//Playing on keyboard
const keyboardPlaying = (event) => {
    if (event.repeat == true) {
        return
    }
    const letterDataAudio = event.code.slice(-1);
    const pianoKeyActive = document.querySelector(`[data-letter='${letterDataAudio}']`);
    if (pianoKeyActive !== null) {
        const noteAudio = pianoKeyActive.dataset.note;
        srcKeyboard = `assets/audio/${noteAudio}.mp3`;
        playAudio(srcKeyboard);
        pianoKeyActive.classList.add('piano-key-active');
        pianoKeyActive.classList.add('piano-key-active-pseudo');
    }
}

window.addEventListener('keydown', keyboardPlaying );
window.addEventListener('keyup', (event) => {
    const letterDataKey = event.code.slice(-1);
    const pianoKeyUp = document.querySelector(`[data-letter='${letterDataKey}']`);
    if (pianoKeyUp !== null) {
        pianoKeyUp.classList.remove('piano-key-active');
        pianoKeyUp.classList.remove('piano-key-active-pseudo');
    }
});

//Mouseover Playing
piano.addEventListener('mouseover', (event) => {
    if (isMousedown === true && isMouseup === false) {
        srcMaking(event);
        event.target.classList.add('piano-key-active');
        event.target.classList.add('piano-key-active-pseudo');
    }
});

//fullScreen
document.addEventListener("keypress", function(event) {
    if (event.code === 'Enter') {
        toggleFullScreen();
    }
}, false);

btnFullScreen.addEventListener('click', (event) => {
    if (event.target.classList.contains('fullscreen')) {
        toggleFullScreen();
    }
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}









