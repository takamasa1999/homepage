// Version 1 (Modified from https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API#examples)
// const record = document.getElementById("record");
// const stop = document.getElementById("stop");
//
// if (navigator.mediaDevices) {
//   console.log("getUserMedia supported.");
//
//   const constraints = { audio: true };
//   let chunks = [];
//
//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then((stream) => {
//       const mediaRecorder = new MediaRecorder(stream);
//
//       record.onclick = () => {
//         mediaRecorder.start();
//         console.log(mediaRecorder.state);
//         console.log("recorder started");
//         record.style.background = "red";
//         record.style.color = "black";
//         record.disabled = true;
//         stop.disabled = false;
//       };
//
//       stop.onclick = () => {
//         mediaRecorder.stop();
//         console.log(mediaRecorder.state);
//         console.log("recorder stopped");
//         record.style.background = "";
//         record.style.color = "";
//       };
//
//       mediaRecorder.onstop = (e) => {
//         record.disabled = false;
//         stop.disabled = true;
//         const audioPlayer = document.getElementById("audio-player");
//         const blob = new Blob(chunks, { type: "audio/webm" });
//         chunks = [];
//         const audioURL = URL.createObjectURL(blob);
//         audioPlayer.src = audioURL;
//         swal(
//           "Success!",
//           "Your audio has been submitted and is now being transcribed. Check back later for the result. ⏳",
//           "success",
//         );
//         transcribeAudio(blob).then((text) => {});
//       };
//
//       mediaRecorder.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };
//     })
//     .catch((err) => {
//       console.error(`The following error occurred: ${err}`);
//       swal(
//         "Oops something went wrong!",
//         "Enable microphone permission in Site settings and retry.",
//         "error",
//       );
//     });
// }
//
// async function transcribeAudio(audioBlob) {
//   const language = document.getElementById("language-selector").value;
//   const url = new URL("https://api.repainter.net/transcribe/");
//   url.searchParams.set("lang", language);
//   const formData = new FormData();
//   formData.append("file", audioBlob, "audio.webm");
//   const response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });
//   const json = await response.json();
//   return json.text;
// }

// Version 2 (Half written by AI)
const record = document.getElementById("record");
const stop = document.getElementById("stop");

let mediaRecorder = null;
let stream = null;
let chunks = [];

if (navigator.mediaDevices?.getUserMedia) {
  console.log("getUserMedia supported.");

  // ↓ 録音ボタンクリック時にだけ許可を要求
  record.onclick = async () => {
    try {
      // ユーザー操作直後に呼ぶ（iOS/Safari対策）
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 可能なら適切な MIME を選択（未対応環境では空でOK）
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";

      mediaRecorder = new MediaRecorder(stream, mime ? { mimeType: mime } : {});
      chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        record.disabled = false;
        stop.disabled = true;
        record.style.background = "";
        record.style.color = "";

        // マイクを確実にOFF
        try {
          stream.getTracks().forEach((t) => {
            t.stop();
          });
        } catch {}

        // 元コードの挙動を維持
        const audioPlayer = document.getElementById("audio-player");
        const blob = new Blob(chunks, { type: mime || "audio/webm" });
        chunks = [];
        const audioURL = URL.createObjectURL(blob);
        audioPlayer.src = audioURL;

        swal(
          "Success!",
          "Your audio has been submitted and is now being transcribed. Check back later for the result. ⏳",
          "success",
        );

        try {
          await transcribeAudio(blob);
        } catch (e) {
          console.error(e);
        }
      };

      // Start recording and then update UI
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "red";
      record.style.color = "black";
      record.disabled = true;
      stop.disabled = false;
    } catch (err) {
      console.error(`The following error occurred: ${err?.name || err}`);
      swal(
        "Oops something went wrong!",
        "Enable microphone permission in Site settings and retry.",
        "error",
      );
    }
  };

  stop.onclick = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
    }
  };

  // ページ離脱時のクリーンアップ（任意）
  window.addEventListener("beforeunload", () => {
    try {
      stream?.getTracks().forEach((t) => {
        t.stop();
      });
    } catch {}
  });
} else {
  console.log("getUserMedia not supported.");
}

async function transcribeAudio(audioBlob) {
  const language = document.getElementById("language-selector").value;
  const url = new URL("https://api.repainter.net/transcribe/");
  url.searchParams.set("lang", language);
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.webm");
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const json = await response.json();
  return json.text;
}
