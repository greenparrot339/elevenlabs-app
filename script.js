async function generateSpeech() {
  const text = document.getElementById("text").value;
  const filename = document.getElementById("filename").value || "output.mp3";
  const voiceId = document.getElementById("voiceId").value; // <-- Get selected voice
  const audioPlayer = document.getElementById("audioPlayer");
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";
  audioPlayer.src = "";

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, filename, voiceId }) // <-- Send it here
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const blob = await response.blob();
    const audioURL = URL.createObjectURL(blob);
    audioPlayer.src = audioURL;
  } catch (error) {
    errorMsg.textContent = "Error: " + error.message;
  }
}
