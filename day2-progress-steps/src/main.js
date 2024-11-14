// This class provides a point on the list with the require props
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    #head;
    #current;
    #tail;

    constructor(itemsList) {
        // init properties
        this.#head = null;
        this.#current = null;
        this.#tail = null;
        this.length = itemsList.length

        // append each value of the itemsList based on its positional order
        itemsList.forEach(element => {
            this.#append(element);
        });
    }

    // add a new node at the end of the list
    #append(value) {
        const newNode = new Node(value);

        // If the list is empty, both head and tail point to the new node
        if (!this.#head) {
            this.#head = newNode;
            this.#current = newNode;
            this.#tail = newNode;
        } else {
            // Otherwise, link the last node's 'next' to the new node
            this.#tail.next = newNode;
            newNode.prev = this.#tail;  // Set the new node's 'prev' to the current tail
            this.#tail = newNode;       // Update the tail to the new node
        }
    }

    getNext() {
        if(!this.#current) return null;

        const next = this.#current.next;
        if(next) {
            // change the current node to the next one.
            this.#current = next;
        }

        return next?.value;
    }

    getPrev() {
        if(!this.#current) return null;

        const prev = this.#current.prev;
        if(prev) {
            // change the current node to the prev one.
            this.#current = prev;
        }

        return prev?.value;
    }

    getCurrent() {
        if(!this.#current) return null;

        return this.#current.value;
    }

    // check if the current item is the last one
    isLast() {
        return this.#current === this.#tail;
    }

    // check if the current item is the first one
    isFirst() {
        return this.#current === this.#head;
    }
}


const stepsList = new DoublyLinkedList(document.querySelectorAll('.step'));
const progressLine = document.querySelector('.progress-line');
const INCREASE_RATIO = (1 / (stepsList.length - 1)) * 100 
let progressRatio = 0;

function previous(pBtn) {
    const curretStep = stepsList.getCurrent();
    const isLast = stepsList.isLast();
    const prevStep = stepsList.getPrev();
    const isFirst = stepsList.isFirst();

    if (!curretStep) return; // this should not happen, but just in case.

    curretStep.classList.remove('active');
    if(progressRatio > 0) {
        progressRatio -= INCREASE_RATIO;
        progressLine.style.width = progressRatio + '%';
    }

    if(isFirst) {
        pBtn.disabled = !pBtn.disabled;
    }

    if(isLast) {
        // find previous btn and activate it
        const nBtn = document.querySelector('.steps-actions').lastElementChild;
        nBtn.disabled = !nBtn.disabled;
    }
    
}

function next(nBtn) {

    const isFirst = stepsList.isFirst();
    const nextStep  = stepsList.getNext();
    const isLast = stepsList.isLast();

    if(nextStep) {
        nextStep.classList.add('active');

        if(progressRatio < 100) {
            progressRatio += INCREASE_RATIO;
            progressLine.style.width = progressRatio + '%';
        }
    }

    if(isFirst) {
        // find previous btn and activate it
        const pbutton = document.querySelector('.steps-actions').firstElementChild;
        pbutton.disabled = !pbutton.disabled;
    }

    if(isLast) {
        nBtn.disabled = !nBtn.disabled;
    }
}
