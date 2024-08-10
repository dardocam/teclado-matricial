const socket = io();
socket.on("arduino:data", function (dataSerial) {
  console.log(dataSerial.value);
  //   document.getElementById('serialData').innerHTML = dataSerial.value;
});
