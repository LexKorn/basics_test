export const calc = (birthday) => {
    const nowTime = Date.now();
    const lineTime = new Date(birthday);
    const marginTime = nowTime - lineTime;
    const age = Math.floor(marginTime / 1000 / 60 / 60 / 24 / 365);
    return age;
};