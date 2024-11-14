function play(btn) {
    // take the content of the btn and transform to be the audio id.
    const key = btn.textContent.trim().toLowerCase();
    const audio = document.getElementById(key);

    if(audio) {
        audio.play()
    }else {
        console.log("audio not found by key: ", key);
    }
}
