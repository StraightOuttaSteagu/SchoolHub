export interface activeCompound {
    formula: string,
    x: number,
    y: number
}

export interface elementModel {
    inactive: boolean,
    symbol: string,
    name: string,
    mass: number,
    Z: number,
    valences: number[] | string,
    group: string,
    x: number,
    y: number,
    period: number,
    positionGroup: number,
    anionValence?: number
}
  
export interface reactivityModel {
    symbol: string,
    electronegativity: number | null
}
  
export interface parsedCompoundModel {
    parts: parsedElementModel[],
    type: 'acid' | 'base' | 'metal oxide' | 'nonmetal oxide' | 'salt' | 'metal' | 'nonmetal' | 'water' | 'hydrogen peroxide' | 'other' | null,
    baseElement: string,
    original: string
}
  
export interface parsedElementModel {
    element: string,
    amount: number,
    properties?: elementModel
}