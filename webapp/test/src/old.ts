function isEnclosedInParentheses(compound: string): boolean {
    let count = 0;
  
    for (let i = 0; i < compound.length - 1; i++) {
      if (compound[i] === '(') {
        count++;
      } else if (compound[i] === ')') {
        count--;
      }

      if (count === 0) {
        return false;
      }
    }
  
    return true;
}