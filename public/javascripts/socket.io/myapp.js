var numbers = [];
var key = "3546";
var resp = "";
var data = "";
const socket = io();
document.querySelector(".container").classList.add("fade-in");
socket.on("arduino:data", function (dataSerial) {
  // console.log(dataSerial.value);
  if (dataSerial.value.includes("release")) {
    // console.log(dataSerial.value.charAt(0));
    const n = dataSerial.value.charAt(0);
    data = dataSerial.value.charAt(0);
    numbers.push(n);
  }
  if (numbers.length <= 4) {
    if (dataSerial.value.charAt(0) != "c") {
      document.querySelector("p").innerHTML =
        dataSerial.value.charAt(0) + "-" + numbers.length;
    }
  }

  if (numbers.length == 4) {
    numbers.forEach((nms) => {
      console.log(nms);
      resp = resp + nms;
    });
    console.log(resp);
    if (resp == key) {
      console.log("====================================");
      console.log("WINNER");
      console.log("====================================");
      document.querySelector("p").innerHTML = "Complete";
      document.querySelector(".container").classList.remove("fade-in");
      document.querySelector(".container").classList.remove("shake");
      document.querySelector(".container").classList.add("simple-celebration");
      socket.emit("complete", "finish");
      numbers.splice(0, numbers.length); // Elimina todos los elementos
      resp = "";
      setTimeout(() => {
        location.reload();
      }, 10000);
    } else {
      console.log("====================================");
      console.log("LOOSER");
      console.log("====================================");
      document.querySelector("p").innerHTML = "Bad request";
      document.querySelector(".container").classList.remove("fade-in");
      document
        .querySelector(".container")
        .classList.remove("simple-celebration");
      document.querySelector(".container").classList.add("shake");
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
  // }
});
