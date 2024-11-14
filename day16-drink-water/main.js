// TODO: WaterGoal props private (getter and setter).

const WaterGoal = {
    goal: 2,
    current: 0,
    addGlass() {
        if(this.current >= this.goal) {
            return;
        }

        this.current += 0.25; 
    },
    removeGlass() {
        if(this.current <= 0) {
            return;
        }
        this.current -= 0.25; 
    }
};

const waterGlasses = [];
const waterGlassGoal = document.getElementById("glassGoal");
const goalRemained = document.getElementById("goalRemained");
const goalSpecs = document.getElementById("goalSpecs");

function toggleWaterGlass(element) { 
    const glassid = element.dataset.glassid;
    element.classList.toggle('active');

    // const isDrunk = typeof waterGlasses.find((glass) => glass === glassid) !== 'undefined';
    // as the waterid start from 1 we use this method for better performace since we will use the id later on
    const isDrunk = waterGlasses.indexOf(glassid);

    if(isDrunk >= 0) {
        WaterGoal.removeGlass();
        // since isDrunk have the idx this isn't need it
        // const index = waterGlasses.indexOf(glassid); 
        // if(index !== -1) {
        //     waterGlasses.splice(index, 1);
        // }

        // remove the glassId from waterGlasses
        waterGlasses.splice(isDrunk, 1);
    } else {
        WaterGoal.addGlass();
        waterGlasses.push(glassid);
    }

    animateGoal();
}

function animateGoal() {
    const waterPorcentage = WaterGoal.current / WaterGoal.goal * 100;
    const specPorcentage = (100 - waterPorcentage) * 0.5;

    goalRemained.textContent = `${WaterGoal.goal - WaterGoal.current}L`;
    goalSpecs.style.top = `${specPorcentage}%`;

    waterGlassGoal.style.height =  `${waterPorcentage}%`;
    waterGlassGoal.innerHTML = `<span>${waterPorcentage.toFixed(1)}%</span>`
}
