import React from "react";

function useDebounce(value, delay) {
    const [debounceValue, setdebounceValue] = React.useState(value);
    
    React.useEffect(() => {
        const handler = setTimeout(() => setdebounceValue(value),delay);

        return () => clearTimeout(handler);
    },[value]);

    return debounceValue;
}

export default useDebounce;