import { useState } from "react";

export default function ImageLoader(props) {
    const [isLoaded, setIsLoaded] = useState(false);

    function onLoad() {
        setIsLoaded(true)
    }

    return <img {...props} loading="lazy" onLoad={onLoad} style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.25s' }} />
}