let countdownActionsScript = () => {
    let obj = {
        everyStep(dataObject) {
            console.log(dataObject.countdownLength)
    }
}
    return obj
}

let timer = (countdownLength,countdownFunction,script) => {
    script = script()
    let countdownCompleted = countdownFunction(countdownLength,null,script)
    if (countdownCompleted === true) return script
}

let countdownFunction = (countdownLength,finishMessage="Countdown Complete!",script) => {
    let intervalID = setInterval(() => {
        if (countdownLength > 0) {
            script.everyStep({countdownLength}) //
            countdownLength -= 1}
        else if (countdownLength == 0) {script.onfinish()}
        else {}
        
    }, 1000);

}