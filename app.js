if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

const weightInput = document.getElementById("weight-input");
const bottleTypeSelector = document.getElementById("bottle-type-selector");
const startingVolumeInput = document.getElementById("starting-volume");
const consumedField = document.getElementById("consumed");
const remainingField = document.getElementById("remaining");

const bottleWeights = {
    'pigeon-small': 33.3,
    'pigeon-large': 43.1
}
const hundredMlFormulaWeight = 103

weightInput.addEventListener("input", updateResult);
bottleTypeSelector.addEventListener("input", updateResult);
startingVolumeInput.addEventListener("input", updateResult);

function updateResult() {
    const baseBottleWeight = bottleWeights[bottleTypeSelector.value]
    const totalBottleWeight = weightInput.value
    const startingVolume = startingVolumeInput.value

    const mlRemaining = Math.ceil((totalBottleWeight - baseBottleWeight) / (hundredMlFormulaWeight / 100))

    if ([totalBottleWeight, startingVolume].indexOf("") !== -1 || isNaN(mlRemaining)) {
        consumedField.innerHTML = "–"
        remainingField.innerHTML = "–"
    } else {
        consumedField.innerHTML = Math.min(Math.max(startingVolume - mlRemaining, 0), startingVolume)
        remainingField.innerHTML = Math.max(mlRemaining, 0)
    }
}
