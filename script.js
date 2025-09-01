
const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

  const dropdown=document.querySelectorAll(".dropdowns select");
  const btn=document.querySelector("form button");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".to select");
  const msg=document.querySelector(".msg");

  function reduceDecimalPoints(number){
       return number.toFixed(2);
  }

  for(let select of dropdown)
  {
      for(currCode in countryList)
      {
        let newOpt=document.createElement("option");
        newOpt.innerText=currCode;
        newOpt.value=currCode;
        if (select.name === "from" && currCode === "USD")
         {
            newOpt.selected = "selected";
          } 
          else if (select.name === "to" && currCode === "PKR")
         {
            newOpt.selected = "selected";
          }
        select.append(newOpt);
      }
      select.addEventListener("change",(evt) => {
         updateFlag(evt.target);
      });
  }

const updateExchangeRate = async () => {
  let Amount= document.querySelector(".amount input");
  let amountValue= Amount.value;
  if(amountValue===""||amountValue<1)
  {
     amountValue=1;
     Amount.value="1";
  }
  const URL= `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
  let responce = await fetch(URL);
  console.log(responce);
  let data= await responce.json();
  console.log(data);
  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(rate);
  let finalAmount = amountValue * rate;
  finalAmount = reduceDecimalPoints(finalAmount);
  console.log(finalAmount);
  msg.innerText=`${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


  const updateFlag = (element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;

  };

  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
     btn.classList.add('clicked');
});

window.addEventListener("load",()=>{
  updateExchangeRate();
});

