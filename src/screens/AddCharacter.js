import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import useDatabase from '../config/useDatabase'

export default function AddCharacter() {
    const [name, setName] = useState("")

    const {database} = useDatabase()

    const create = useCallback(async () => {
        try {
            if (name == "") {
                return alert("Campo nome obrigatório!")
            }

            await database.runAsync("INSERT INTO characters (name) VALUES (?)", name)

            navigation.navigate("home")
        }
        
        catch (error) {
            console.error(error)
        }
    }, [database])

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Text style={{fontSize: 18}}>
                Novo Personagem
            </Text>

            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, width: 300}}
                placeholder="Nome do personagem"
                onChangeText={(value) => setName(value)}
            />

            <View style={{flexDirection: "row", justifyContent: "space-evenly", width: 300}}>
                <View style={{width: 100}}>
                    <Button
                        title="Voltar"
                        onPress={() => navigation.navigate("home")}
                    />
                </View>

                <View style={{width: 100}}>
                    <Button
                        title="Adicionar"
                        color="#4CAF50"
                        onPress={() => create()}
                    />
                </View>
            </View>
        </View>
    )
}
