import { parse } from "./parser";
import { parsedCompoundModel } from "./data";
import { tableElements } from "../data";

export function getMass(compound: string): number {
    if (compound.match(/[A-Z]/g)?.length! === 1) {
        return tableElements.find(el => el.symbol === compound)?.mass!;
    }

    let mass = 0;

    const compounds: parsedCompoundModel = parse(compound);

    if (compounds.parts.length === 1 && (compounds.parts[0].element === 'OH' || compounds.parts[0].element === 'NH4')) {
        return compounds.parts[0].element === 'OH' ? 17 : 18;
    }

    for (let compound of compounds.parts) {
        mass += getMass(compound.element) * compound.amount;
    }

    return mass;
}

function enclose(element: string, index: number): string {
    return index > 1 && element.match(/[A-Z]/g)?.length! > 1 ? `(${element})` : element;
}

function smallestCommonMultiple(x: number, y: number): number {
    const P = x * y;

    while (y) {
        const r = x % y;
        x = y;
        y = r;
    }

    return P / x;
}

function combineElements(elements: parsedCompoundModel[]): string[] {
    const valence1: string | number[] = elements[0].parts[0].properties!.valences, valence2 = elements[1].parts[0].properties!.valences;

    if (typeof valence1 === 'string' || typeof valence2 === 'string') {
        return []
    }

    const results: string[] = [];

    for (let v1 of valence1) {
        for (let v2 of valence2) {
            if (v1 > 0 && v2 < 0) {
                const scm = smallestCommonMultiple(v1, Math.abs(v2));
                const index1 = scm / v1, index2 = scm / Math.abs(v2);
                results.push(`${elements[0].parts[0].element}${index1 > 1 ? index1 : ''}${elements[1].parts[0].element}${index2 > 1 ? index2 : ''}`);
            } else if (v1 < 0 && v2 > 0) {
                const scm = smallestCommonMultiple(Math.abs(v1), v2);
                const index1 = scm / Math.abs(v1), index2 = scm / v2;
                results.push(`${elements[1].parts[0].element}${index2 > 1 ? index2 : ''}${elements[0].parts[0].element}${index1 > 1 ? index1 : ''}`);
            }
        }
    }

    return results;
}

function combineAcidWithBase(elements: parsedCompoundModel[]): string[] {
    if (elements[0].type === 'base') {
        [elements[0], elements[1]] = [elements[1], elements[0]];
    }

    const v1 = Math.abs(elements[0].parts[0].amount), v2 = elements[1].parts[1].amount;

    const scm = smallestCommonMultiple(v1, v2);

    const index1 = scm / v2, index2 = scm / v1;

    console.log(elements[1].parts[0].element, elements[0].parts[1].element)

    return [`${enclose(elements[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${enclose(elements[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`, 'H2O'];
}

function combineAcidWithOxide(elements: parsedCompoundModel[]): string[] {
    if (elements[0].type === 'metal oxide') {
        [elements[0], elements[1]] = [elements[1], elements[0]]
    }

    const v1 = Math.abs(elements[0].parts[1].amount) * 2, v2 = elements[1].parts[0].amount;

    const scm = smallestCommonMultiple(v1, v2);

    const index1 = scm / v2, index2 = scm / v1;

    return [`${enclose(elements[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${enclose(elements[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`, 'H2O'];
}

function combineBaseWithOxide(elements: parsedCompoundModel[]): string[] {
    if (elements[0].type === 'nonmetal oxide') {
        [elements[0], elements[1]] = [elements[1], elements[0]]
    }

    const v1 = Math.abs(elements[0].parts[1].amount), v2 = elements[1].parts[0].amount * 2;
    
    const scm = smallestCommonMultiple(v1, v2);

    const index1 = scm / v2, index2 = scm / v1;

    return [`${enclose(elements[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${enclose(elements[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`, 'H2O'];

}

function combineAcidWithSalt(elements: parsedCompoundModel[]): string[] {
    return [];
}

function matchCases(el1: parsedCompoundModel, el2: parsedCompoundModel, case1: string, case2: string): boolean {
    return (el1.type === case1 && el2.type === case2) || (el1.type === case2 && el2.type === case1);
}

function combine(elements: parsedCompoundModel[]): string[] | null { // null means elements can't combine

    // water / hydrogen peroxide

    if ((elements[0].baseElement == 'H2' && elements[1].baseElement == 'O2') || (elements[0].baseElement == 'O2' && elements[1].baseElement == 'H2')) {
        return ['H2O', 'H2O2'];
    }

    console.log(elements[0], elements[1])

    if (elements[0].parts.length === 1 && elements[1].parts.length === 1) return combineElements(elements);

    if (matchCases(elements[0], elements[1], 'acid', 'base')) return combineAcidWithBase(elements); // normal neutralisation reaction

    if (matchCases(elements[0], elements[1], 'acid', 'salt')) return combineAcidWithSalt(elements); // always double displacement both ways (we see later)

    if (matchCases(elements[0], elements[1], 'acid', 'metal oxide')) return combineAcidWithOxide(elements); // if cationic oxide, returns salt and water. Otherwise is more complicated

    //if (matchCases(elements[0], elements[1], 'base', 'salt')) return doubleDisplacement(elements); // double displacement

    if (matchCases(elements[0], elements[1], 'base', 'nonmetal oxide')) return combineBaseWithOxide(elements); // if metalic oxide, can't combine a cation with another cation so reaction can't happen. Otherwise, salt + water

    // if (matchCases(elements[0], elements[1], 'metal oxide', 'salt')) return doubleDisplacement(elements); // if metalic oxide, double displacement. Otherwise can't work

    //if (matchCases(elements[0], elements[1], 'salt', 'salt')) return doubleDisplacement(elements); // double displacement

    // Oxygen + nonmetal oxide creates higher oxidation number oxides
    
    // Oxygen + metal oxide may react

    // water + base may also react (gives ions)

    //if ((elements[0].type === 'metal oxide' && elements[1].baseElement === 'H2O') || (elements[1].type === 'metal oxide' && elements[0].baseElement === 'H2O')) return doubleDisplacement(elements); // returns base

    //if ((elements[0].type === 'nonmetal oxide' && elements[1].baseElement === 'H2O') || (elements[1].type === 'nonmetal oxide' && elements[0].baseElement === 'H2O')) return doubleDisplacement(elements); // returns acid

    //if ((elements[0].type === 'acid' && elements[1].baseElement === 'metal') || (elements[1].type === 'acid' && elements[0].baseElement === 'metal')) return doubleDisplacement(elements); // returns hydrogen gas and a salt if the metal is reactive enough to get hydrogen out of acid

    // acid + nonmetal => reactivity table

    // metal + salt => reactivity table

    // nonmetal + salt => reactivity table

    // not sure for single displacement in oxides

    //if (matchCases(elements[0], elements[1], 'oxide', 'oxide')) return doubleDisplacement(elements); // Results in something if we have a cationic and anionic oxide, not sure what it results to
    
    return [];
}

export function executeCommand(reaction: string): string[] | null {
    const elements: parsedCompoundModel[] = reaction.replaceAll(' ', '').split('+').map(el => parse(el));

    return combine(elements);
}

console.log(getMass('H2SO4'))