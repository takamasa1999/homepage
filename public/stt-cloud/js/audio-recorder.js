const record = document.getElementById("record");
const stop = document.getElementById("stop");

if (navigator.mediaDevices) {
  console.log("getUserMedia supported.");

  const constraints = { audio: true };
  let chunks = [];

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      record.onclick = () => {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";
        record.style.color = "black";
        record.disabled = true;
        stop.disabled = false;
      };

      stop.onclick = () => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
      };

      mediaRecorder.onstop = (e) => {
        record.disabled = false;
        stop.disabled = true;
        const audioPlayer = document.getElementById("audio-player");
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];
        const audioURL = URL.createObjectURL(blob);
        audioPlayer.src = audioURL;
        swal(
          "Success!",
          "Your audio has been submitted and is now being transcribed. Check back later for the result. ⏳",
          "success"
        );
        transcribeAudio(blob).then((text) => {
        })

      };

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
    })
    .catch((err) => {
      console.error(`The following error occurred: ${err}`);
      swal("Oops", "Something went wrong!", "error")
    });
}

async function transcribeAudio(audioBlob) {
  const formData = new FormData()
  formData.append("file", audioBlob, "audio.webm")
  const response = await fetch("https://api.repainter.net/transcribe/", {
    method: "POST",
    body: formData
  })
  const json = await response.json()
  return json.text
}