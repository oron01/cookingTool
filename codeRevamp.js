let timerDisplay = document.querySelector(".timerDisplay")
timerDisplay.textContent = "00:00"

let setCountdownClosed = async (lengthInSeconds) => { //A simple function inputs a number of seconds and outputs true when it passed
    return new Promise((resolve) => {
        let timerIntervalID = setInterval(() => {
            if (lengthInSeconds > 0) {lengthInSeconds -= 1}
            else if (lengthInSeconds <= 0) {
        clearInterval(timerIntervalID)
        resolve(true);
    } 
        }, 1000)    
    })
}

let setCountdown = async (lengthInSeconds,displayElement=timerDisplay) => { //A simple function inputs a number of seconds and outputs true when it passed
    return new Promise((resolve) => {
        let timerIntervalID = setInterval(() => {
            let displayText
            if (lengthInSeconds > 0) {lengthInSeconds -= 1
                displayText = `${(lengthInSeconds - (lengthInSeconds % 60))/60}:${lengthInSeconds % 60}`
            if (displayElement !== null) {                displayElement.textContent = displayText}
        }
            else if (lengthInSeconds <= 0) {
        clearInterval(timerIntervalID)
        resolve(true);
    } 
        }, 1000)    
    })
} 

let cookEgg = async (client="terminal") => {
    //Stage one
    display(client,"Add water to heating device (kettle or pot)")
    getResponse(client,"may proceed if generated a full boil")
    display(client,"add water to pot if not already in")
    getResponse(client,"may proceed if boiling water is in the pot")
    display(client,"add egg to the pot")
    getResponse(client,"may proceed if egg is in the pot")
    display(client,"Wait for the egg to cook, the timer will inform you.")
    await setCountdown(60*8)
    display(client,"The cooking has been complete, egg may be taken out")
    display(client,"done")

}

let cookRice = async (client="terminal") => {
    //Stage one
    display(client,"Two and a half cups of rice to a pot)")
    await getResponse(client,"rice in pot")
    display(client,"wash three times")
    await getResponse(client,"rice washed?")
    display(client,"pour 3 and a half cups of water into kettle and activate")
    await getResponse(client,"3.5 cups in kettle activated?")
    display(client,"Pour kettle water to pot")
    await getResponse(client,"pot water boiling?")
    display(client,"wait for boil")
    display(client,"timer is in progress")
    await setCountdown(60*9)
    display(client,"The cooking has been complete, heat off")
    await getResponse(client,"confirm")
    display(client,"done")

}

let display = (client,message) => {
    if (client == "terminal") {console.log(message)}
    else if (client == "gui") {
      let responseElement = document.querySelector(".response")
      responseElement.textContent = message 
    }
}

let getResponse = async (client,message) => {
    if (client == "terminal") {prompt(message)}
    if (client == "gui") {await handleProceedButtonClick()}
}

let handleProceedButtonClick = async () => {
    return new Promise((resolve) => {
        const button = document.querySelector(".proceedButton");
        button.addEventListener("click",function handleClick() {
            button.removeEventListener("click",handleClick)
            console.log("bsns")
            resolve()
        })
    })

}

let wouldBreakRiceButton = document.querySelector(".tempFoodSelectorContainer")
wouldBreakRiceButton.addEventListener("click",() => {cookRice("gui")})