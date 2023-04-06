export const isDynamicRoute = (str: string): boolean => {
    const regex = /_\w+_/;
    return regex.test(str);
}

// Function for getting all dynamic substrings from a rapid-web path string
export const getDynamicSubstrings = (inputString: string): string[] => {
    const regex = /_.*?_/g; // the regex pattern we want to match on (this will catch cases like "_id_" etc)
    const matches = inputString.match(regex); // returns an array of matches or null if no matches are found
    if (matches === null) {
      return []; // return any empty array if no matches are found (this should almost never happen)
    }

    return matches;
}

// Function for generating a path url from a path string that contains rapid-web dynamic substrings
export const generatePathUrl = (path: string, updated_paths: Array<any>): string => {
    const dynamicPaths: Array<any> = getDynamicSubstrings(path);

    // If we have dynamic paths, we need to replace them with the correct values
    if (dynamicPaths.length > 0) {
        let url = path;
        dynamicPaths.forEach((dynamicPath, index) => {
            url = url.replace(dynamicPath, updated_paths[index]);
        });
        return url;
    }


    return path;
}

export const toArray = (obj: any): any[] => {
    if (Array.isArray(obj)) {
        return obj;
    }

    return [obj];
}
