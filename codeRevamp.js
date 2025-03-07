setCountdown = (lengthInSeconds) => {
    setInterval(() => {
        if (lengthInSeconds > 0) {lengthInSeconds -= 1
        setCountdown(lengthInSeconds)}        
    }, 1000);
    console.log("completed")
    return true
}

