export const isDynamicRoute = (str: string): boolean => {
    const regex = /_\w+_/;
    return regex.test(str);
}

export const generatePathUrl = (path: string): string => {
    return "";
}
