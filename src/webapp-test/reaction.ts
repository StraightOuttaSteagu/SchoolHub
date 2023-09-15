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

function parseCompound(element: string): parsedCompoundModel | null {

    const parsedCompound: parsedCompoundModel = {
        parts: splitCompound(element),
        type: null,
        baseElement: element,
        original: element
    }

    if (parsedCompound.parts.length == 1) {
        parsedCompound.type = parsedCompound.parts[0].properties!.group=='Other nonmetals'?'nonmetal':'metal';

        return parsedCompound;
    }

    if (parsedCompound.baseElement == 'H2O') {
        parsedCompound.type = 'water';
        
        return parsedCompound;
    }

    if (parsedCompound.baseElement == 'H2O2') {
        parsedCompound.type = 'hydrogen peroxide';
        
        return parsedCompound;
    }

    if (parsedCompound.parts.at(-1)?.element == 'O') {
        parsedCompound.type = 'oxide';

    } else if (parsedCompound.parts.at(-1)?.element == 'OH') {
        parsedCompound.type = 'base';

    } else if (parsedCompound.parts[0].element == 'H') {
        parsedCompound.type = 'acid';

    } else {
        parsedCompound.type = 'salt';

    }
    
    return parsedCompound;
}

function combination(el1: string, el2: string) {
    
}

function decomposition(el1: any) {
    
}

function singleDisplacement(el1: any, el2: any) {
    
}

function doubleDisplacement(el1: any, el2: any) {
    
}

console.log(parseCompound('H2SO4'));