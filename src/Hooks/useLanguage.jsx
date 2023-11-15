import { useEffect, useState } from "react";

const allowedLanguages = ["de", "en"]

export default function useLanguage() {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || ""
    )

    useEffect(() => {
        if (!language) {
            let newLanguage = navigator.language.split("-")[0]

            if (!allowedLanguages.includes(newLanguage)) {
                newLanguage ="en"
            }

            setLanguage(newLanguage)

            localStorage.setItem("language", newLanguage)
        }
    }, [language])

    const changeLanguage = (targetLanguage) => {
        let changeLanguage = targetLanguage

        if (!allowedLanguages.includes(changeLanguage)) {
            changeLanguage ="en"
        }

        setLanguage(changeLanguage)

        localStorage.setItem("language", changeLanguage)
        }


    return [language, changeLanguage]
}