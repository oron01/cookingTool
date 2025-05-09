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

const riceSong = new Audio('XueHue.mp3');
riceSong.loop = true; // This makes it loop

let audio = new Audio('alarmSound.mp3');

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
        audio.play()
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
    riceSong.play();
    display(client,"4 cups of rice to a pot)")
    await getResponse(client,"rice in pot?")
    display(client,"wash three times")
    await getResponse(client,"rice washed?")
    display(client,"pour 6 cups of water into kettle and activate")
    await getResponse(client,"6 cups in kettle activated?")
    display(client,"Pour kettle water to pot and activate")
    await getResponse(client,"kettle water boiling?")
    display(client,"pour kettle water to pot turn heat and close lid")
    await getResponse(client,"wait two minutes to set up timer")
    await setCountdown(60*2)
    display(client,"boiling timer is in progress")
    await getResponse(client,"pot water boiling?")
    await setCountdown(60*9)
    display(client,"cooking timer is in progress")
    display(client,"The cooking has been complete, heat off")
    await getResponse(client,"confirm")
    display(client,"done")
    riceSong.pause()

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