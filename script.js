const pwdDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");

const pwdStrengthMsg = document.querySelector("[data-displayPwdStrength]");

const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

const uppercaseTick = document.querySelector("#uppercase");
const lowercaseTick = document.querySelector("#lowercase");
const numbersTick = document.querySelector("#numbers");
const symbolsTick = document.querySelector("#symbols");

let pwd = "";
let pwdLength = 10;
const value = document.querySelector("#pwd-length-value");
const input = document.querySelector("#pwd-length");
value.textContent = pwdLength;
input.addEventListener("input", (event) => {
  pwdLength = event.target.value;
  // here we have set the length of the password which has been set by the user
  handleSlider();
});

function handleSlider() {
  value.textContent = pwdLength;
  input.value = pwdLength;
  // this will be displayed in the screen
}


function getRandomNumbers(length = 1) {
  let randInt = "";
  for (let i = 0; i < length; i++) {
    randInt += Math.floor(Math.random() * 9 + 1);
  }
  return randInt;
}

let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function getRandomUppercase(length = 1) {
  let randUpperCase = "";
  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * 26);
    randUpperCase += alphabets.toUpperCase().split("")[randomNumber];
  }
  return randUpperCase;
}

function getRandomLowercase(length = 1) {
  let randLowerCase = "";
  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * 26);
    randLowerCase += alphabets.toLowerCase().split("")[randomNumber];
  }
  return randLowerCase;
}

let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function getRandomSymbols(length = 1) {
  let randSymbol = "";
  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * symbols.length);
    randSymbol += symbols.split("")[randomNumber];
  }
  return randSymbol;
}

// now the function to copy from the clipboard thing
let copyBtn = document.querySelector("#copyButton");
copyBtn.addEventListener("click", checkcopyBtnHandler);

function checkcopyBtnHandler() {
  if (pwdDisplay.value) {
    copyBtnHandler();
  }
}
async function copyBtnHandler() {
  try {
    // this will copy the text to the clipboard
    // get the element from where we need to copy the text

    // pwdDisplay.select();
    await navigator.clipboard.writeText(pwdDisplay.value);
  } catch (error) {
    console.log("was not able to ");
  }

  console.log(pwdDisplay.value);
  // alert("Copied : ",pwdDisplay.textContent);
  // its job is also to alert the user that the mssge is successfully copied
  copyMsg.style.visibility = "visible";
  setTimeout(() => {
    copyMsg.style.visibility = "hidden";
  }, 2000);
}

let checkboxCount = 0;

allCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckboxes);
});

function handleCheckboxes() {
  checkboxCount = 0;
  allCheckBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkboxCount++;

    }
    if (checkboxCount > pwdLength) {
      pwdLength = checkboxCount;
      handleSlider();
    }
  });
  console.log(checkboxCount);
}

let checkedCheckboxList = [];


// random number generator within the range

function getARandomNumber(upto){
  return Math.floor(Math.random() * upto);
}

// function getRandomPassword(length) {
//   // length = 6 hai iska mtlb 6length ka pwd aur generate karna hai
//   console.log("the rest of the pwd is : ",length)
//   let pwdLengthToBeGenerated = length;
//   let pwd = '';
//   // yha pe randomNumber le liya hai out of that length ab simple hai 
//   // basically utte length ki chize add krdo jitna random number aya hai
//   // 
  
  
  
//   let i = 0
//   while(pwdLengthToBeGenerated > 0) {
//     let randNum = getARandomNumber(pwdLengthToBeGenerated);
//     console.log("the random number which we got is : ",randNum,
//       " out of ,",pwdLengthToBeGenerated
//     );
//     let myPwd = checkedCheckboxList[i](randNum);
//     pwd += myPwd;
//     console.log("the pwd at the current moment is : ",pwd);
//     pwdLengthToBeGenerated-=randNum;
//     i++;
//   }
// return pwd;


// }

function calculateStrength(){
  let color = ""
  if (checkboxCount>=3 && pwdLength>7){
    color = "rgb(2, 240, 2)"
  }
  else if(checkboxCount >= 2 && pwdLength > 5){
    color = "yellow"
  }
  else
    color = "red"


    pwdStrengthMsg.style.backgroundColor = color;
    pwdStrengthMsg.style.boxShadow = `0 0 12px ${color}`
}


let generatePwdBtn = document.querySelector("#generate-pwd-btn");

generatePwdBtn.addEventListener("click", () => {
  // when anyone will click on the generate pwd btn it should know how many checkboxes are checked
  handleCheckboxes();

  if(checkboxCount === 0 )
      return;

  // checkBoxHandler();
  // generate the pwd
  pwd = ''
  
  // the compulsory addition

  if (uppercaseTick.checked) {
    if(!checkedCheckboxList.includes(getRandomUppercase)){
      checkedCheckboxList.push(getRandomUppercase);
    }
  }
  if (lowercaseTick.checked) {
    checkedCheckboxList.push(getRandomLowercase);
  }
  if(numbersTick.checked){
    checkedCheckboxList.push(getRandomNumbers);
  }
  if(symbolsTick.checked){
        checkedCheckboxList.push(getRandomSymbols);
  }

  console.log(checkedCheckboxList)
  
  checkedCheckboxList.forEach(
    fun => {
      pwd += fun();
    }
  )
  // console.log("the checkbox count is : ",checkboxCount)
  // console.log("the password is : ",pwdLength);

  // let getTheRndom = getRandomPassword(pwdLength-checkedCheckboxList.length);
  // console.log("the pwd before adding the random stuff",pwd);
  // pwd+=getTheRndom;


  // the remaining addition
  for (let i = 0; i < pwdLength-checkedCheckboxList.length; i++) {
    console.log("there it is")
    let num =  getARandomNumber(checkedCheckboxList.length);
    console.log("the random number is : ",num)
    let sme = checkedCheckboxList[num]()
    pwd += sme;
    
  }
  pwdDisplay.value = pwd

  calculateStrength();

  checkedCheckboxList = []
});
