const choiceWrapper = document.getElementById('choicesContainer');
const choicePicker = document.getElementById('choicePicker');

function getChoices() {
    // verified is the choice picker has choices and collect them.
    let choices = choicePicker.value.split(',');
    const hasChoices = choices.length > 0;

    if (hasChoices) {
        // transform choices into DOM elements.
        const choicesResult = transformChoices(choices);
        choiceWrapper.innerHTML = choicesResult;
    }
}

function transformChoices(choices) {
    if(!Array.isArray(choices)) {
        return console.error("incorrect parameter type. choices is not an Array.");
    }

    return choices.map(choice => `<span>${choice}</span>`).join("");
}
