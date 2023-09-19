import { tableElements, parsedCompoundModel, parsedElementModel } from "./data";

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

export function splitCompound(compound: string): parsedElementModel[] {

    const parts: parsedElementModel[] = [];
    let currentPart: parsedElementModel = {
        element: '',
        amount: 0
    };

    for (let i = 0; i < compound.length; i++) {
        const char = compound[i];

        if (char === '(') {
            if (currentPart.element != "") {
                parts.push(separateNumber(currentPart));

                currentPart = {
                    element: '',
                    amount: 0
                };
            }

            i++;

            let parenthesisCount = 1;

            while (parenthesisCount) {
                currentPart.element += compound[i++];

                if (compound[i] == '(') {
                    parenthesisCount++;
                } else if (compound[i] == ')') {
                    parenthesisCount--;
                }
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
        part.properties = tableElements.filter(el => el.symbol === part.element)[0];
    }

    return parts;

}

function compoundStartsWithCation(element: string): false | string {
    if (element.startsWith('NH4') || element.startsWith('(NH4)')) {
        return 'NH4';
    }

    const firstElement = splitCompound(element)[0].element;

    const firstElementGroup: string = tableElements.filter(el => el.symbol === firstElement)[0].group;

    if (firstElementGroup != 'Other nonmetals' && firstElementGroup != 'Noble gases') {
        return firstElement;
    }
    return false;
}

export function parseCompound(element: string): parsedCompoundModel {

    const parsedCompound: parsedCompoundModel = {
        parts: [],
        type: null,
        baseElement: '',
        original: element
    }

    if (element.match(/[A-Z]/g)?.length === 1) {
        const singleElement = element.replace(/\d/g, '');
        parsedCompound.type = tableElements.filter(el => el.symbol === singleElement)[0].group === 'Other nonmetals' ? 'nonmetal' : 'metal';
        parsedCompound.baseElement = element;

        return parsedCompound;
    }
    
    if (element === 'H2O') { // water
        parsedCompound.type = 'water';
        parsedCompound.baseElement = element;

        return parsedCompound;
    }
    
    if (element === 'H2O2') { // hydrogen peroxide
        parsedCompound.type = 'hydrogen peroxide';
        parsedCompound.baseElement = element;

        return parsedCompound;
    }
    
    if (element.startsWith('H')) { // acid; Element contains positive hydrogen and an anion (radical acid);
        const anion = element.slice(1).replace(/^\d+/, '');

        if (anion[0] != '(' && anion.match(/[A-Z]/g)!.length > 1) {
            element = element.replace(anion, `(${anion})`);
        }

        parsedCompound.type = 'acid';
        parsedCompound.baseElement = element;

        return parsedCompound;
    }
    
    if (element.replace(/\d+$/, '').replace(')', '').endsWith('OH')) { // element is a base

        if (element.startsWith('NH4')) {
            element = '(NH4)(OH)'
        }

        if (element.endsWith('OH')) {
            element = element.slice(0, -2) + "(OH)";
        }

        parsedCompound.baseElement = element;
        parsedCompound.type = 'base';

        return parsedCompound;
    }

    const startsWithCation = compoundStartsWithCation(element);
    
    if (startsWithCation && element.replace(startsWithCation, '').replace(/\d+/g, '').replace('(', '').replace(')', '') != 'O') { // element is salt

        const anion = element.slice(startsWithCation.length).replace(/^\d+/, '');

        if (startsWithCation === 'NH4') {
            element = '(NH4)' + element.slice(3);
        }

        if (anion[0] != '(' && anion.match(/[A-Z]/g)!.length > 1) {
            element = element.replace(anion, `(${anion})`);
        }

        parsedCompound.baseElement = element;
        parsedCompound.type = 'salt';

        return parsedCompound;
    } 
    
    // Element is oxide

    const ion = element.replace(/\d+$/, '').slice(0, -1);

    if (element[0] != '(' && ion.match(/[A-Z]/g)!.length > 1) {
        element = element.replace(ion, `(${ion})`);
    }

    parsedCompound.baseElement = element;
    parsedCompound.type = (ion === 'NH4' || (ion.replace(/\d+/g, '').match(/[A-Z]/g)?.length === 1 && tableElements.find(el => el.group != 'Other nonmetals'))) ? 'metal oxide' : 'nonmetal oxide';

    return parsedCompound;
}

export function parse(element: string) {
    const parsedCompound = parseCompound(element);
    parsedCompound.parts = splitCompound(parsedCompound.baseElement);

    return parsedCompound;
}