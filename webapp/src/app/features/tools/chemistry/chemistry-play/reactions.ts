import { Parser } from "./parser";
import { parsedCompoundModel, reactivityModel } from "./models";
import { elementsReactivity, tableElements } from "./data";

export class Reaction {
    private _parser: Parser = new Parser();

    private _electronegativitiy: reactivityModel[] = elementsReactivity;

    createIonFromOxide(oxide: string): { ion: string, valence: number } {
        const parsedOxide = this._parser.splitCompound(oxide);

        if (parsedOxide[0].element === 'P') {
            return { ion: 'PO' + (Math.ceil(parsedOxide[1].amount / 2 + 1) > 1 ? Math.ceil(parsedOxide[1].amount / 2 + 1) : ''), valence: 3 };
        }

        if (parsedOxide[0].amount === 2) {
            return { ion: parsedOxide[0].element + 'O' + (Math.ceil(parsedOxide[1].amount / 2) > 1 ? Math.ceil(parsedOxide[1].amount / 2) : ''), valence: this._parser.findElementBySymbol(parsedOxide[0].element).anionValence! };
        }

        return { ion: parsedOxide[0].element + 'O' + (parsedOxide[1].amount + 1), valence: this._parser.findElementBySymbol(parsedOxide[0].element).anionValence! };
    }

    getValenceByGroup(group: number): number {
        if (group < 3) {
            return group;
        }

        if (group > 12 && group < 15) {
            return group - 10;
        }

        if (group > 14) {
            return 18 - group;
        }

        return 0;
    }

    matchCases(el1: parsedCompoundModel, el2: parsedCompoundModel, case1: string, case2: string): boolean {
        return (el1.type === case1 && el2.type === case2) || (el1.type === case2 && el2.type === case1);
    }

    getMass(compound: string): number {
        if (compound.match(/[A-Z]/g)?.length! === 1) {
            return tableElements.find(el => el.symbol === compound)?.mass!;
        }
    
        let mass = 0;
    
        const compounds: parsedCompoundModel = this._parser.parseString(compound);
    
        if (compounds.parts.length === 1 && (compounds.parts[0].element === 'OH' || compounds.parts[0].element === 'NH4')) {
            return compounds.parts[0].element === 'OH' ? 17 : 18;
        }
    
        for (let compound of compounds.parts) {
            mass += this.getMass(compound.element) * compound.amount;
        }
    
        return mass;
    }

    findReactivityBySymbol(symbol: string): reactivityModel {
        return this._electronegativitiy.find(el => el.symbol === symbol)!;
    }

    enclose(element: string, index: number): string {
        return index > 1 && element.match(/[A-Z]/g)?.length! > 1 ? `(${element})` : element;
    }

    leastCommonMultiple(x: number, y: number): number {
        const P = x * y;
    
        while (y) {
            const r = x % y;
            x = y;
            y = r;
        }
    
        return P / x;
    }

    combineElements(compounds: parsedCompoundModel[]): string[][] {

        if (this._electronegativitiy.find(el => el.symbol === compounds[0].parts[0].element)?.electronegativity! > this._electronegativitiy.find(el => el.symbol === compounds[1].parts[0].element)?.electronegativity!) {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }

        const 
            valence1: string | number[] = compounds[0].parts[0].properties!.valences,
            valence2: string | number[] = compounds[1].parts[0].properties!.valences;
    
        if (typeof valence1 === 'string' || typeof valence2 === 'string') return [];
    
        const results: string[] = [];
    
        for (let v1 of valence1) {
            for (let v2 of valence2) {
                if ((v1 > 0 && v2 < 0) || (v1 < 0 && v2 > 0)) {
                    const lcm = this.leastCommonMultiple(Math.abs(v1), Math.abs(v2));
                    const index1 = lcm / Math.abs(v1), index2 = lcm / Math.abs(v2);
                    results.push(`${compounds[0].parts[0].element}${index1 > 1 ? index1 : ''}${compounds[1].parts[0].element}${index2 > 1 ? index2 : ''}`);
                }
            }
        }
    
        return [results];
    }

    combineAcidWithBase(compounds: parsedCompoundModel[]): string[] {
        if (compounds[0].type === 'base') {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }
    
        const v1 = Math.abs(compounds[0].parts[0].amount), v2 = compounds[1].parts[1].amount;
    
        const lcm = this.leastCommonMultiple(v1, v2);
    
        const index1 = lcm / v2, index2 = lcm / v1;
    
        console.log(compounds[1].parts[0].element, compounds[0].parts[1].element)
    
        return [`${this.enclose(compounds[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${this.enclose(compounds[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`, 'H2O'];
    }

    combineAcidWithSalt(compounds: parsedCompoundModel[]): string[] {
        if (compounds[0].type === 'salt') {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }
    
        const anionValence = compounds[1].parts[1].element.match(/[A-Z]/g)?.length === 1 ? this.getValenceByGroup(this._parser.findElementBySymbol(compounds[1].parts[1].element).positionGroup) : this._parser.findElementBySymbol(compounds[1].parts[1].element.replace('O', '').replace(/\d+/g, '')).anionValence;

        const v1 = compounds[0].parts[0].amount, v2 = anionValence! * compounds[1].parts[1].amount / compounds[1].parts[0].amount;

        const lcm = this.leastCommonMultiple(v1, v2);

        const index1 = lcm / v2, index2 = lcm / v1;
        
        return [`H${anionValence! > 1 ? anionValence : ''}${compounds[1].parts[1].element}`, `${this.enclose(compounds[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${this.enclose(compounds[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`];
    }

    combineAcidWithOxide(compounds: parsedCompoundModel[]): string[] { // Not working properly
        if (compounds[0].type === 'metal oxide') {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }
    
        const v1 = compounds[0].parts[0].amount, v2 = compounds[1].parts[1].amount * 2 / compounds[1].parts[0].amount;
    
        const lcm = this.leastCommonMultiple(v1, v2);
    
        const index1 = lcm / v2, index2 = lcm / v1;
    
        return [`${this.enclose(compounds[1].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${this.enclose(compounds[0].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`, 'H2O'];
    }

    combineBaseWithOxide(compounds: parsedCompoundModel[]): string[] {
        if (compounds[0].type === 'nonmetal oxide') {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }

        const oxideIon = this.createIonFromOxide(compounds[1].original);

        const v1 = oxideIon.valence, v2 = compounds[0].parts[1].amount;

        const lcm = this.leastCommonMultiple(v1, v2);

        const index2 = lcm / v2, index1 = lcm / v1;
                        
        return [`${compounds[0].parts[0].element}${index2 > 1 ? index2 : ''}${this.enclose(oxideIon.ion, index1)}${index1 > 1 ? index1 : ''}`, 'H2O'];
    }

    combineBaseWithSalt(compounds: parsedCompoundModel[]): string[] {
        if (compounds[0].type === 'salt') {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }
    
        const anionValence = compounds[1].parts[1].element.match(/[A-Z]/g)?.length === 1 ? this.getValenceByGroup(this._parser.findElementBySymbol(compounds[1].parts[1].element).positionGroup) : this._parser.findElementBySymbol(compounds[1].parts[1].element.replace('O', '').replace(/\d+/g, '')).anionValence!;

        const valence = anionValence * compounds[1].parts[1].amount / compounds[1].parts[0].amount;

        const lcm = this.leastCommonMultiple(compounds[0].parts[1].amount, anionValence);

        const index2 = lcm / anionValence, index1 = lcm / compounds[0].parts[1].amount;

        return [`${compounds[1].parts[0].element}${this.enclose('OH', valence)}${valence > 1 ? valence : ''}`, `${this.enclose(compounds[0].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${this.enclose(compounds[1].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`];
    }

    combineOxideWithSalt(compounds: parsedCompoundModel[]): string[] {
        if (compounds[0].type === 'salt') {
            [compounds[0], compounds[1]] = [compounds[1], compounds[0]];
        }
    
        const anionValence = compounds[1].parts[1].element.match(/[A-Z]/g)?.length === 1 ? this.getValenceByGroup(this._parser.findElementBySymbol(compounds[1].parts[1].element).positionGroup) : this._parser.findElementBySymbol(compounds[1].parts[1].element.replace('O', '').replace(/\d+/g, '')).anionValence!;

        const v1 = 2 * compounds[0].parts[1].amount / compounds[0].parts[0].amount, v2 = anionValence * compounds[1].parts[1].amount / compounds[1].parts[0].amount;

        const lcm = this.leastCommonMultiple(v1, anionValence), lcm2 = this.leastCommonMultiple(2, v2);

        const index2 = lcm / anionValence, index1 = lcm / v1, index3 = lcm2 / 2, index4 = lcm2 / v2;

        return [`${compounds[1].parts[0].element}${index4 > 1 ? index4 : ''}O${index3 > 1 ? index3 : ''}`, `${this.enclose(compounds[0].parts[0].element, index1)}${index1 > 1 ? index1 : ''}${this.enclose(compounds[1].parts[1].element, index2)}${index2 > 1 ? index2 : ''}`];
    }

    combineSaltWithSalt(compounds: parsedCompoundModel[]): string[] {
        const 
            AV1 = compounds[0].parts[1].element.match(/[A-Z]/g)?.length === 1 ? this.getValenceByGroup(this._parser.findElementBySymbol(compounds[0].parts[1].element).positionGroup) : this._parser.findElementBySymbol(compounds[0].parts[1].element.replace('O', '').replace(/\d+/g, '')).anionValence!,
            AV2 = compounds[1].parts[1].element.match(/[A-Z]/g)?.length === 1 ? this.getValenceByGroup(this._parser.findElementBySymbol(compounds[1].parts[1].element).positionGroup) : this._parser.findElementBySymbol(compounds[1].parts[1].element.replace('O', '').replace(/\d+/g, '')).anionValence!;

        const
            v1 = AV1 * compounds[0].parts[1].amount / compounds[0].parts[0].amount,
            v2 = AV2 * compounds[1].parts[1].amount / compounds[1].parts[0].amount

        const lcm1 = this.leastCommonMultiple(AV1, v2), lcm2 = this.leastCommonMultiple(AV2, v1);

        const index1 = lcm1 / AV1, index2 = lcm1 / v2, index3 = lcm2 / AV2, index4 = lcm2 / v1;

        return [`${compounds[0].parts[0].element}${index3}${compounds[1].parts[1].element}${index4}`, `${compounds[0].parts[1].element}${index1}${compounds[1].parts[0].element}${index2}`];
    }

    executeCommand(reaction: string): string[][] {
        return this.combine(reaction.replaceAll(' ', '').split('+').map(el => this._parser.parseString(el)));
    }

    combine(compounds: parsedCompoundModel[]): string[][] {

        if ((compounds[0].baseElement == 'H2' && compounds[1].baseElement == 'O2') || (compounds[0].baseElement == 'O2' && compounds[1].baseElement == 'H2')) return [['H2O']];

        if (compounds[0].parts.length === 1 && compounds[1].parts.length === 1) return this.combineElements(compounds);

        if ((compounds[0].baseElement == 'H2O' && compounds[1].baseElement == 'O2') || (compounds[0].baseElement == 'O2' && compounds[1].baseElement == 'H2O')) return [['H2O2']];

        if (this.matchCases(compounds[0], compounds[1], 'acid', 'base')) return [this.combineAcidWithBase(compounds)]; // normal neutralisation reaction

        if (this.matchCases(compounds[0], compounds[1], 'acid', 'salt')) return [this.combineAcidWithSalt(compounds)]; // always double displacement both ways (we see later)
    
        if (this.matchCases(compounds[0], compounds[1], 'acid', 'metal oxide')) return [this.combineAcidWithOxide(compounds)]; // if cationic oxide, returns salt and water. Otherwise is more complicated
    
        if (this.matchCases(compounds[0], compounds[1], 'base', 'salt')) return [this.combineBaseWithSalt(compounds)]; // double displacement
    
        if (this.matchCases(compounds[0], compounds[1], 'base', 'nonmetal oxide')) return [this.combineBaseWithOxide(compounds)]; // if metalic oxide, can't combine a cation with another cation so reaction can't happen. Otherwise, salt + water
    
        if (this.matchCases(compounds[0], compounds[1], 'metal oxide', 'salt')) return [this.combineOxideWithSalt(compounds)]; // if metalic oxide, double displacement. Otherwise can't work
    
        // if (this.matchCases(compounds[0], compounds[1], 'salt', 'salt')) return [this.combineSaltWithSalt(compounds)]; // double displacement
    
        // Oxygen + nonmetal oxide creates higher oxidation number oxides
        
        // Oxygen + metal oxide may react
    
        // water + base may also react (gives ions)
    
        //if ((compounds[0].type === 'metal oxide' && compounds[1].baseElement === 'H2O') || (compounds[1].type === 'metal oxide' && compounds[0].baseElement === 'H2O')) return doubleDisplacement(compounds); // returns base
    
        // if ((compounds[0].type === 'nonmetal oxide' && compounds[1].baseElement === 'H2O') || (compounds[1].type === 'nonmetal oxide' && compounds[0].baseElement === 'H2O')) return combineOxideWithWater(compounds); // returns acid
    
        //if ((compounds[0].type === 'acid' && compounds[1].baseElement === 'metal') || (compounds[1].type === 'acid' && compounds[0].baseElement === 'metal')) return doubleDisplacement(compounds); // returns hydrogen gas and a salt if the metal is reactive enough to get hydrogen out of acid
    
        // acid + nonmetal => reactivity table
    
        // metal + salt => reactivity table
    
        // nonmetal + salt => reactivity table
    
        // not sure for single displacement in oxides
    
        //if (matchCases(compounds[0], compounds[1], 'metalic oxide', 'nemetalic oxide')) return doubleDisplacement(compounds); // Results in something if we have a cationic and anionic oxide, not sure what it results to
        
        return [];
    }
}

// function combineOxideWithWater(elements: parsedCompoundModel[]): string[] {
//     return [];
// }

// function combine(elements: parsedCompoundModel[]): string[] | null { // null means elements can't combine

//     // water / hydrogen peroxide

//     if ((elements[0].baseElement == 'H2' && elements[1].baseElement == 'O2') || (elements[0].baseElement == 'O2' && elements[1].baseElement == 'H2')) {
//         return ['H2O', 'H2O2'];
//     }

//     console.log(elements[0], elements[1])

//     if (elements[0].parts.length === 1 && elements[1].parts.length === 1) return combineElements(elements);

//     if (matchCases(elements[0], elements[1], 'acid', 'base')) return combineAcidWithBase(elements); // normal neutralisation reaction

//     if (matchCases(elements[0], elements[1], 'acid', 'salt')) return combineAcidWithSalt(elements); // always double displacement both ways (we see later)

//     if (matchCases(elements[0], elements[1], 'acid', 'metal oxide')) return combineAcidWithOxide(elements); // if cationic oxide, returns salt and water. Otherwise is more complicated

//     //if (matchCases(elements[0], elements[1], 'base', 'salt')) return doubleDisplacement(elements); // double displacement

//     if (matchCases(elements[0], elements[1], 'base', 'nonmetal oxide')) return combineBaseWithOxide(elements); // if metalic oxide, can't combine a cation with another cation so reaction can't happen. Otherwise, salt + water

//     // if (matchCases(elements[0], elements[1], 'metal oxide', 'salt')) return doubleDisplacement(elements); // if metalic oxide, double displacement. Otherwise can't work

//     //if (matchCases(elements[0], elements[1], 'salt', 'salt')) return doubleDisplacement(elements); // double displacement

//     // Oxygen + nonmetal oxide creates higher oxidation number oxides
    
//     // Oxygen + metal oxide may react

//     // water + base may also react (gives ions)

//     //if ((elements[0].type === 'metal oxide' && elements[1].baseElement === 'H2O') || (elements[1].type === 'metal oxide' && elements[0].baseElement === 'H2O')) return doubleDisplacement(elements); // returns base

//     if ((elements[0].type === 'nonmetal oxide' && elements[1].baseElement === 'H2O') || (elements[1].type === 'nonmetal oxide' && elements[0].baseElement === 'H2O')) return combineOxideWithWater(elements); // returns acid

//     //if ((elements[0].type === 'acid' && elements[1].baseElement === 'metal') || (elements[1].type === 'acid' && elements[0].baseElement === 'metal')) return doubleDisplacement(elements); // returns hydrogen gas and a salt if the metal is reactive enough to get hydrogen out of acid

//     // acid + nonmetal => reactivity table

//     // metal + salt => reactivity table

//     // nonmetal + salt => reactivity table

//     // not sure for single displacement in oxides

//     //if (matchCases(elements[0], elements[1], 'oxide', 'oxide')) return doubleDisplacement(elements); // Results in something if we have a cationic and anionic oxide, not sure what it results to
    
//     return [];
// }


// console.log(getMass('H2SO4'))