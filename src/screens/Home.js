import Ionicons from "@expo/vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { Text, View } from "react-native"
import useDatabase from "../config/useDatabase"
import { useCallback, useEffect, useState } from "react"

export default function Home() {
    const [characters, setCharacters] = useState([])

    const navigation = useNavigation()

    const {database} = useDatabase()

    const getAll = useCallback(async () => {
        try {
            setCharacters(await database.getAllAsync("SELECT * FROM characters"))
        }
        
        catch (error) {
            console.error(error)
        }
    }, [database])

    const drop = useCallback(async (id) => {
        try {
            await database.runAsync("DELETE FROM characters WHERE id = ?", id)
        }
        
        catch (error) {
            console.error(error)
        }
    }, [database])

    useEffect(() => {
        getAll()
    }, [getAll])

    const charactersList = characters.map((character, index) => (
        <View key={index} style={{flexDirection: "row", width: 350}}>
            <View style={{width: 250, borderWidth: 0.5, paddingVertical: 5}}>
                <Text style={{padding: 5}}>
                    {character.name}
                </Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: 100, borderWidth: 0.5, paddingVertical: 5, textAlign: "center"}}>
                <Ionicons
                    style={{padding: 5}}
                    name="pencil"
                    size={18}
                    color="green"
                    onPress={() => {
                        navigation.navigate("editCharacter", {character})
                    }}
                />

                <Ionicons
                    style={{padding: 5}}
                    name="trash"
                    size={18}
                    color="red"
                    onPress={() => drop(character.id)}
                />
            </View>
        </View>
    ))

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 325}}>
                <Text style={{fontSize: 18}}>
                    PERSONAGENS
                </Text>

                <Ionicons
                    style={{padding: 5, borderWidth: 1, borderColor: "#4CAF50"}}
                    name="add"
                    size={24}
                    color="#4CAF50"
                    onPress={() => navigation.navigate("addCharacter")}
                />
            </View>

            <View>
                <View style={{flexDirection: "row", width: 350, marginVertical: 15}}>
                    <Text style={{width: 250, borderWidth: 0.5, paddingVertical: 5, textAlign: "center"}}>NOME</Text>
                    <Text style={{width: 100, borderWidth: 0.5, paddingVertical: 5, textAlign: "center"}}>AÇÕES</Text>
                </View>

                {charactersList}
            </View>

        </View>
    )
}
