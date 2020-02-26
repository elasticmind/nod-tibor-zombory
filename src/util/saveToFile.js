export default function saveToFile(text) {
  var textFileAsBlob = new Blob([text], { type: "text/csv" });
  var downloadLink = document.createElement("a");

  downloadLink.download = "submissions.csv";

  if (window.URL != null) {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.click();
  } else {
    alert("This browser does not support webkitURL!");
  }
}
