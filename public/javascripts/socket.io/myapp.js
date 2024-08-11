var numbers = [];
var key = "5582";
var resp = "";
var data = "";
const socket = io();
socket.on("arduino:data", function (dataSerial) {
  // console.log(dataSerial.value);
  if (dataSerial.value.includes("release")) {
    // console.log(dataSerial.value.charAt(0));
    const n = dataSerial.value.charAt(0);
    data = dataSerial.value.charAt(0);
    numbers.push(n);
  }
  if (numbers.length <= 4) {
    document.querySelector("p").innerHTML =
      dataSerial.value.charAt(0) + "-" + numbers.length;
  }

  if (numbers.length == 4) {
    numbers.forEach((nms) => {
      console.log(nms);
      resp = resp + nms;
    });
    if (resp == key) {
      console.log("====================================");
      console.log("WINNER");
      console.log("====================================");
      document.querySelector("p").innerHTML = "Complete";
      setTimeout(() => {
        socket.emit("complete", "finish");
      }, 2000);
    } else {
      console.log("====================================");
      console.log("LOOSER");
      console.log("====================================");
      document.querySelector("p").innerHTML = "Bad request";
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }
  // }
});
