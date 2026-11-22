export const typefaces = [
    { id: "lenia", name: "Lenia", description: "The original", family: '"Lenia", Arial, sans-serif' },
    { id: "instrument", name: "Instrument Sans", description: "Precise & contemporary", family: '"Instrument Sans", Arial, sans-serif' },
    { id: "bricolage", name: "Bricolage Grotesque", description: "Expressive & geometric", family: '"Bricolage Grotesque", Arial, sans-serif' },
    { id: "spectral", name: "Spectral", description: "An editorial serif", family: '"Spectral", Georgia, serif' },
] as const;

export type TypefaceId = typeof typefaces[number]["id"];
export const fontStorageKey = "portfolio-font";

export function isTypeface(value: unknown): value is TypefaceId {
    return typefaces.some(({ id }) => id === value);
}

export const fontPreferenceScript = `try{const font=localStorage.getItem(${JSON.stringify(fontStorageKey)});if(${JSON.stringify(typefaces.map(({ id }) => id))}.includes(font))document.documentElement.dataset.font=font}catch{}`;
