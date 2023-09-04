export type wordObject = {
    startX: number,
    startY: number,
    focusX: number,
    focusY: number,
    endX: number,
    endY: number,
    topColor: string,
    bottomColor: string,
    fontSize: number,
    content: string,
    temp: {
        clipLine0X: number,
        clipLine0Y: number,
        clipLine1X: number,
        clipLine1Y: number,
        clipLine2X: number,
        clipLine2Y: number
    }
}

export type pageObject = {
    words: wordObject[],
    textBoxWords: string[],
    glues: string[],
    activityType: 'Remember & Write' | 'Listen & Write' | 'Right & Wrong',
    activityData: boolean | string | null
}