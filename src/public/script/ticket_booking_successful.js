const hashData = document.getElementById("hashData").textContent;
const apiUrl =
  "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + hashData;

// Fetch image data
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.blob();
  })
  .then((blob) => {
    const imageUrl = URL.createObjectURL(blob);

    const qrCodeImage = document.getElementById("qrCodeTicket");
    qrCodeImage.src = imageUrl;
    qrCodeImage.alt = "QR Code Image";

    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "ticket.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  })
  .catch((error) => {
    console.error("Error fetching QR code:", error);
  });
