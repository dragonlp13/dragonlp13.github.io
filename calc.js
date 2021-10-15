// function checkParams() {
//   let n = $("#n").val() ;
//   let price = $("#price").val();
//   if(n.length !== 0 && price.length !== 0) {
//   $("#submit").removeAttr("disabled");
//   } else {
//       $("#submit").attr("disabled", "disabled");
//   }
// }
function calc() {
  let price = Number(document.getElementById("price").value);
  let n = Number(document.getElementById("n").value);
  let result = price * n;
  if (Number.isNaN(result)) {
    document.getElementById("result").innerHTML = "Error!";
  }
  else {
    document.getElementById("result").innerHTML = result;
  }
  document.getElementById("price").value = "";
  document.getElementById("n").value = "";
}//$("#submit").click(function(){
//$("#submit").attr("disabled",true);})
