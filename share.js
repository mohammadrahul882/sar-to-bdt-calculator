function shareApp() {

if (navigator.share) {

navigator.share({
title: "Rahul Finance",
text: "Check this currency calculator",
url: window.location.href
});

} else {

alert("Sharing not supported on this device");

}

}
