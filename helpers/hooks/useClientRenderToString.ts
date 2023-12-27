import React from "react";

import { clientRenderToString } from "./clientRenderToString";

type UseClientRenderToString = (
    input: React.ReactElement | React.ReactElement[],
    deps?: any[]
) => string[];


export const useClientRenderToString: UseClientRenderToString = (input, deps = []) => {
    const [htmlStringList, setHtmlStringList] = React.useState<string[]>([]);
    const elementList = Array.isArray(input) ? input : [input];
    
    React.useEffect(() => {
        (async () => {
            const markupPromises = elementList.map(clientRenderToString);
            const markup: string[] = await Promise.all(markupPromises);
            
            if (!setHtmlStringList) {
                return;
            }
            
            setHtmlStringList(markup);
        })();
    }, deps);
    
    return htmlStringList;
};