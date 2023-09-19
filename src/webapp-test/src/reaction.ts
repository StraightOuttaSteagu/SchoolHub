import { parse } from "./parser";
import { parsedCompoundModel, elementModel, tableElements } from "./data";

function enclose(element: string, index: number): string {
    return index > 1 && element.match(/[A-Z]/g)?.length ? `(${element})` : element;
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

    return [`${enclose(elements[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${enclose(elements[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`, 'H2O'];
}

function doubleDisplacement(elements: parsedCompoundModel[]): string[] {
    const
        v1 = 1
}

function matchCases(el1: parsedCompoundModel, el2: parsedCompoundModel, case1: string, case2: string): boolean {
    return (el1.type === case1 && el2.type === case2) || (el1.type === case2 && el2.type === case1);
}

function combine(elements: parsedCompoundModel[]): string[] | null { // null means elements can't combine

    // water / hydrogen peroxide

    if ((elements[0].baseElement == 'H2' && elements[1].baseElement == 'O2') || (elements[0].baseElement == 'O2' && elements[1].baseElement == 'H2')) {
        return ['H2O', 'H2O2'];
    }

    if (elements[0].parts.length === 1 && elements[1].parts.length === 1) {
        return combineElements(elements);
    }

    if (matchCases(elements[0], elements[1], 'acid', 'base')) {
        return combineAcidWithBase(elements);
    }

    if (matchCases(elements[0], elements[1], 'acid', 'salt') || matchCases(elements[0], elements[1], 'base', 'salt') || matchCases(elements[0], elements[1], 'oxide', 'acid')) {
        return doubleDisplacement(elements);
    }

    
    return [];
}

function executeCommand(reaction: string): string[] | null {
    const elements: parsedCompoundModel[] = reaction.replaceAll(' ', '').split('+').map(el => parse(el));

    return combine(elements);
}

console.log(executeCommand('H2SO4 + Al(OH)3'));