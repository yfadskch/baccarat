document.getElementById("play").addEventListener("click", () => {
    fetch("/game/play")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("result").innerText = `Result: ${data.result}`;
        })
        .catch((error) => console.error("Error:", error));
});
