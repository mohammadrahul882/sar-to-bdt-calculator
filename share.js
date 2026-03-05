function shareApp() {

  const shareData = {
    title: "Rahul Finance",
    text: "💱 Best SAR to BDT Currency Calculator - Rahul Finance",
    url: window.location.href
  };

  // Mobile Native Share
  if (navigator.share) {

    navigator.share(shareData)
      .then(() => {
        console.log("App shared successfully");
      })
      .catch((error) => {
        console.log("Sharing failed", error);
        alert("Sharing failed");
      });

  } else {

    // Fallback System (PC / Unsupported Device)

    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent("💱 Check Rahul Finance Currency Calculator");

    const options = `
1️⃣ Copy Link
2️⃣ Share WhatsApp
3️⃣ Share Facebook
`;

    const choice = prompt("Share Options:\n" + options);

    if (choice == "1") {

      navigator.clipboard.writeText(window.location.href);
      alert("✅ Link Copied Successfully");

    } 
    else if (choice == "2") {

      window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, "_blank");

    } 
    else if (choice == "3") {

      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank");

    } 
    else {

      alert("Sharing not supported on this device");

    }

  }

}
