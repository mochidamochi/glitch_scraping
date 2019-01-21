const scrapingsForm = document.forms[0];
const trgInput = scrapingsForm.elements['scraping'];
var trgList = document.getElementById('scrapings');
const request = new XMLHttpRequest();
request.responseType = 'json';

scrapingsForm.onsubmit = function(event) {
  event.preventDefault();

  trgList.innerHTML = "読み込み中...";
  
  //api構築
  if(trgInput.value.slice(-1) === "/"){
    trgInput.value = trgInput.value.slice(0, -1)
  }
  let reqParams = trgInput.value.split("/")
  let trg_api = "/search/" + reqParams[reqParams.length - 4] + "/" + reqParams[reqParams.length - 3] + "/" + reqParams[reqParams.length - 2] + "/" +  reqParams[reqParams.length - 1]

  console.log("【client】" + trg_api)
  request.open("GET", trg_api);
  
  request.addEventListener("load", (event) => {
    if (event.target.status !== 200) {
        console.log(`${event.target.status}: ${event.target.statusText}`);
        return;
    }
    console.log(event.target.status);
    trgList.innerHTML = "";
    let resParams = event.target.response.param;
    console.log(resParams);

    //GETしたJSONデータをテーブルに出力
    Object.keys(resParams).forEach(function(key) {
      trgList.innerHTML += "<th>" + key + "</th><td>" + resParams[key] + "</td>"
    });
  });
  request.addEventListener("error", () => {
      console.error("Network Error");
  });
  request.send();
};
