if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

const weightInput = document.getElementById("weight-input");
const bottleTypeSelector = document.getElementById("bottle-type-selector");
const startingVolumeInput = document.getElementById("starting-volume");
const remainingField = document.getElementById("remaining");
const consumedField = document.getElementById("consumed");

const bottleWeights = {
    'pigeon-small': 33.3,
    'pigeon-large': 43.1
}
const hundredMlFormulaWeight = 103

weightInput.addEventListener("input", updateResult);
bottleTypeSelector.addEventListener("input", updateResult);
startingVolumeInput.addEventListener("input", updateResult);

updateResult();

function updateResult() {
    const baseBottleWeight = bottleWeights[bottleTypeSelector.value]
    const totalBottleWeight = weightInput.value

    const mlRemaining = Math.ceil((totalBottleWeight - baseBottleWeight) / (hundredMlFormulaWeight / 100))

    if (isNaN(mlRemaining) || mlRemaining < 0) {
        remainingField.innerHTML = startingVolumeInput.value
        consumedField.innerHTML = 0
    } else {
        remainingField.innerHTML = mlRemaining
        consumedField.innerHTML = startingVolumeInput.value - mlRemaining
    }
}
