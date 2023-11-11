import { useEffect, useState } from "react";

export default function useLightMode() {
    const [lightMode, setLightmode] = useState(false)

    useEffect(() => {
        const header = document.querySelector('header');
        if (lightMode) {
            document.body.classList.add("light-mode")
            header.classList.add("light-mode")
        } else {
            document.body.classList.remove("light-mode")
            header.classList.remove("light-mode")
        }
    }, [lightMode])

    const toggleLightMode = () => {
        setLightmode((prevState) => !prevState)
    }

    return [lightMode, toggleLightMode]
}