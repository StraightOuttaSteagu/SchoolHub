import { tableElements, parsedCompoundModel, parsedElementModel } from "./data";

function separateIons(compound: string): string {
    if (compound.endsWith('OH')){
        compound = compound.slice(0, -2) + '(OH)';
    }

    if (compound.startsWith('NH4')){
        compound = compound.slice(0, 3) + '(NH4)';
    }

    return compound;
}

function separateNumber(compound: parsedElementModel): parsedElementModel {
    let match = compound.element.match(/^([A-Za-z]+)(\d+)$/);

    if (match === null) {
        compound.amount = 1;
        return compound;
        
    } else {
        return {
            element: match[1],
            amount: +match[2]
        };
    }
}

function splitCompound(compound: string): parsedElementModel[] {

    compound = separateIons(compound);

    const parts: parsedElementModel[] = [];
    let currentPart: parsedElementModel = {
        element: '',
        amount: 0
    };

    for (let i = 0; i < compound.length; i++) {
        const char = compound[i];

        if (char == '(') {
            if (currentPart.element != "") {
                parts.push(separateNumber(currentPart));

                currentPart = {
                    element: '',
                    amount: 0
                };
            }

            i++;

            while (compound[i] != ')') {
                currentPart.element += compound[i++];
            }

            i++;

            let amount = '';

            while (/[0-9]/.test(compound[i])) {
                amount += compound[i++];
            }

            currentPart.amount = +amount?+amount:1;

            parts.push(currentPart);
            currentPart = {
                element: '',
                amount: 0
            };

            continue;
        }

        if (/[A-Z]/.test(char) && currentPart.element != "") {
            parts.push(separateNumber(currentPart));

            currentPart = {
                element: '',
                amount: 0
            };
        }

        currentPart.element += char;
    }

    if (currentPart.element != "") {
        parts.push(separateNumber(currentPart));

        currentPart = {
            element: '',
            amount: 0
        };
    }

    for (let part of parts) {
        part.properties = tableElements.filter(el => el.symbol == part.element)[0];
    }

    return parts;

}

function compoundStartsWithCation(element: string): false | string {
    return false;
}

function compoundEndsWithOxygen(element: string): boolean {
    return false;
}

function parseCompound(element: string): parsedCompoundModel | null {

    const parsedCompound: parsedCompoundModel = {
        parts: [],
        type: null,
        baseElement: '',
        original: element
    }

    if (element.match(/[A-Z]/g)?.length == 1) {
        const singleElement = element.replace(/\d/g, '');
        parsedCompound.type = tableElements.filter(el => el.symbol === singleElement)[0].group === 'Other nonmetals' ? 'nonmetal' : 'metal';
        parsedCompound.baseElement = element;

    } else if (element === 'H2O') { // water
        parsedCompound.type = 'water';
        parsedCompound.baseElement = element;

    } else if (element === 'H2O2') { // hydrogen peroxide
        parsedCompound.type = 'hydrogen peroxide';
        parsedCompound.baseElement = element;

    } else if (element.startsWith('H')) { // acid; Element contains positive hydrogen and an anion (radical acid);
        const cation = element.slice(1).replace(/^\d+/, '');
        if (cation[0] != '(') {
            element = element.replace(cation, `(${cation})`);
        }

        parsedCompound.type = 'acid';
        parsedCompound.baseElement = element;

    } else if (compoundStartsWithCation(element)) { // element is either Salt or base since it starts with a cation

    } else if (compoundEndsWithOxygen(element)) { // element is oxide

    }
    
    return parsedCompound;
}

console.log(parseCompound('H2(SO4)3'));