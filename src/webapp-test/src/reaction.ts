import { parse } from "./parser";
import { parsedCompoundModel, parsedElementModel } from "./data";

function combine(elements: parsedCompoundModel[]): string[] | null { // null means elements can't combine

    // water / hydrogen peroxide

    if ((elements[0].baseElement == 'H2' && elements[1].baseElement == 'O2') || (elements[0].baseElement == 'O2' && elements[1].baseElement == 'H2')) {
        return ['H2O', 'H2O2'];
    }

    //

    return [];
}

function executeCommand(reaction: string): string[] | null {
    const elements: parsedCompoundModel[] = reaction.replaceAll(' ', '').split('+').map(el => parse(el));

    return combine(elements);
}

console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));
console.log(executeCommand('H2 + O2'));