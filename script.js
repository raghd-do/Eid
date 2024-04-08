function generateImage() {
  var userName = document.getElementById("userName").value;
  var imageUrl = "./JabrEid-2024.jpg";

  // Open a new window for the image page
  var imageWindow = window.open("imagePage.html", "_blank");

  // Once the new window is loaded, insert the image
  imageWindow.onload = function () {
    var imageContainer = imageWindow.document.getElementById("imageContainer");
    var imageElement = new Image();
    imageElement.src = imageUrl;
    imageElement.alt = "Generated Image";

    imageElement.onload = function () {
      var canvas = imageWindow.document.createElement("canvas");
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      var ctx = canvas.getContext("2d");
      // ctx.drawImage(imageElement, 0, 0);
      ctx.drawImage(imageElement, 0, 0); // 120 , 460
      ctx.font = "24px Hekaya";
      ctx.fillStyle = "#585858";
      ctx.fillText(userName, 140, 460);
      ctx.direction = "rtl";
      // Center text horizontally
      ctx.textAlign = "center";
      // Center text vertically (optional)
      ctx.textBaseline = "middle";
      imageContainer.appendChild(canvas);
    };
  };
}

function shareOrDownload() {
  var canvas = document.querySelector("canvas");
  var dataURL = canvas.toDataURL("image/png");

  // Convert data URL to Blob
  fetch(dataURL)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a File object from the Blob
      const file = new File([blob], "generated_image.png", {
        type: "image/png",
      });

      // Check if the navigator.share API is available
      if (navigator.share) {
        navigator
          .share({
            title: "Generated Image",
            files: [file],
          })
          .then(() => console.log("Share successful"))
          .catch((error) => console.log("Share failed:", error));
      } else {
        // Fallback for browsers that don't support the navigator.share API
        console.log("navigator.share API not supported");
      }
    })
    .catch((error) => console.error("Error fetching image:", error));

  //   var a = document.createElement("a");
  //   a.href = dataURL;
  //   a.download = "generated_image.png";
  //   a.click();
}
