import { tableElements } from "./data";
import { elementModel, parsedCompoundModel, parsedElementModel } from "./models";

export class Parser {

    _table: elementModel[] = tableElements;

    findElementBySymbol(symbol: string): elementModel {
        return this._table.find(el => el.symbol === symbol)!;
    }

    parseString(element: string): parsedCompoundModel {
        const parsedCompound = this.parseCompound(element);
        parsedCompound.parts = this.splitCompound(parsedCompound.baseElement);

        return parsedCompound;
    }

    compoundStartsWithCation(element: string): false | string {
        if (element.startsWith('NH4') || element.startsWith('(NH4)')) {
            return 'NH4';
        }
    
        const firstElement = this.splitCompound(element)[0].element;
    
        const firstElementGroup: string = tableElements.filter(el => el.symbol === firstElement)[0].group;
    
        if (firstElementGroup != 'Other nonmetals' && firstElementGroup != 'Noble gases') {
            return firstElement;
        }
        return false;
    }

    separateNumber(compound: parsedElementModel): parsedElementModel {
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

    parseCompound(compound: string): parsedCompoundModel {
        const parsedCompound: parsedCompoundModel = {
            parts: [],
            type: null,
            baseElement: '',
            original: compound
        }

        if (compound.match(/[A-Z]/g)?.length === 1) {
            parsedCompound.type = this.findElementBySymbol(compound.replace(/\d/g, '')).group === 'Other nonmetals' ? 'nonmetal' : 'metal';
            parsedCompound.baseElement = compound;
    
            return parsedCompound;
        }

        if (compound === 'H2O') { // water
            parsedCompound.type = 'water';
            parsedCompound.baseElement = 'H2O';
    
            return parsedCompound;
        }

        if (compound === 'H2O2') { // hydrogen peroxide
            parsedCompound.type = 'hydrogen peroxide';
            parsedCompound.baseElement = 'H2O2';
    
            return parsedCompound;
        }

        if (compound.startsWith('H')) { // acid; Element contains positive hydrogen and an anion
            const anion = compound.slice(1).replace(/^\d+/, '');
    
            if (anion[0] != '(' && anion.match(/[A-Z]/g)!.length > 1) {
                compound = compound.replace(anion, `(${anion})`);
            }
    
            parsedCompound.type = 'acid';
            parsedCompound.baseElement = compound;
    
            return parsedCompound;
        }

        if (compound.replace(/\d+$/, '').replace(')', '').endsWith('OH')) { // element is a base

            if (compound.startsWith('NH4')) {
                compound = '(NH4)(OH)'
            }
    
            if (compound.endsWith('OH')) {
                compound = compound.slice(0, -2) + "(OH)";
            }
    
            parsedCompound.baseElement = compound;
            parsedCompound.type = 'base';
    
            return parsedCompound;
        }

        const startsWithCation = this.compoundStartsWithCation(compound);
    
        if (startsWithCation && compound.replace(startsWithCation, '').replace(/\d+/g, '').replace('(', '').replace(')', '') != 'O') { // element is salt

            const anion = compound.slice(startsWithCation.length).replace(/^\d+/, '');

            if (startsWithCation === 'NH4') {
                compound = '(NH4)' + compound.slice(3);
            }

            if (anion[0] != '(' && anion.match(/[A-Z]/g)!.length > 1) {
                compound = compound.replace(anion, `(${anion})`);
            }

            parsedCompound.baseElement = compound;
            parsedCompound.type = 'salt';

            return parsedCompound;
        }

        const ion = compound.replace(/\d+$/, '').slice(0, -1);

        const noNumberIon = ion.replace(/\d+/g, '');

        parsedCompound.baseElement = compound;
        parsedCompound.type = this.findElementBySymbol(noNumberIon).group === 'Other nonmetals' ? 'nonmetal oxide' : 'metal oxide';

        return parsedCompound;
    }

    splitCompound(compound: string): parsedElementModel[] {
        const parts: parsedElementModel[] = [];
        let currentPart: parsedElementModel = {
            element: '',
            amount: 0
        };
    
        for (let i = 0; i < compound.length; i++) {
            const char = compound[i];
    
            if (char === '(') {
                if (currentPart.element != "") {
                    parts.push(this.separateNumber(currentPart));
    
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
                parts.push(this.separateNumber(currentPart));
    
                currentPart = {
                    element: '',
                    amount: 0
                };
            }
    
            currentPart.element += char;
        }
    
        if (currentPart.element != "") {
            parts.push(this.separateNumber(currentPart));
    
            currentPart = {
                element: '',
                amount: 0
            };
        }
    
        for (let part of parts) {
            part.properties = tableElements.find(el => el.symbol === part.element);
        }
    
        return parts;
    }
}