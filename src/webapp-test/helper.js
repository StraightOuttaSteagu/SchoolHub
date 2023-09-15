function breakStringAtUppercase(inputString) {
  var splitArray = inputString.split(/(?=[A-Z])/);
  var resultString = splitArray.join(' ');
  return resultString;
}

// Example usage:
var inputString = "NaOH";
var brokenString = breakStringAtUppercase(inputString);
console.log(brokenString); // Output: "Hello World Example"