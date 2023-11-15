import useLanguage from "../../Hooks/useLanguage"
import "./Footer.css"

const Footer = () => {
    const [language, changeLanguage] = useLanguage()

    const handleLangauageChange = (language) => {
        changeLanguage(language)
        window.location.reload()
    }
    
    return (
        <footer>
            <h2>By Luca</h2>
            <select onChange={(e) => handleLangauageChange(e.target.value)} value={language}>
                <option value="de">deutsch</option>
                <option value="en">english</option>
            </select>
        </footer>
    )
}

export default Footer