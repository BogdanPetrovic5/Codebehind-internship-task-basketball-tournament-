function addKeys(numberOfKeys, draw){
    const startChar = 'D';
    let offset = numberOfKeys;
    const startCode = startChar.charCodeAt(0);
    const endCode = startCode + offset;
    
    for (let code = startCode; code <= endCode; code++) {
      const char = String.fromCharCode(code);
      draw[char] = [];
    }
    return draw;
}
module.exports = {addKeys}