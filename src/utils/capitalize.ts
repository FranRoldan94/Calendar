export const capitalize = (sentence: string): string => {

    sentence = sentence.trim();
    
    if (!sentence) return sentence; 
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}