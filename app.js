if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

const weightInput = document.getElementById("weight-input");
const bottleTypeSelector = document.getElementById("bottle-type-selector");
const resultField = document.getElementById("result");

const bottleWeights = {
    'pigeon-small': 33.3,
    'pigeon-large': 43.1
}
const hundredMlFormulaWeight = 103

weightInput.addEventListener("input", updateResult);
bottleTypeSelector.addEventListener("input", updateResult);

function updateResult() {
    const baseBottleWeight = bottleWeights[bottleTypeSelector.value]
    const totalBottleWeight = weightInput.value

    const mlRemaining = Math.ceil((totalBottleWeight - baseBottleWeight) / (hundredMlFormulaWeight / 100))

    resultField.innerHTML = isNaN(mlRemaining) ? 0 : Math.max(mlRemaining, 0);
}
