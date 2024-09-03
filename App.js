import { NavigationContainer } from "@react-navigation/native"
import Router from "./src/config/router"
import { useEffect } from "react"
import useDatabase from "./src/config/useDatabase"

export default function App() {
    const {initialize} = useDatabase()

    useEffect(() => {
        initialize()
    }, [])

    return (
        <NavigationContainer>
            <Router/>
        </NavigationContainer>
    )
}
