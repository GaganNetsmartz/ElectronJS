const video = document.getElementById("camera");
video.setAttribute('autoplay', '');

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    console.log(stream);
})