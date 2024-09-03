import { useNavigation } from '@react-navigation/native'
import { Text, View, TextInput, Button } from 'react-native'
import useDatabase from '../config/useDatabase'
import { useCallback, useState } from 'react'

export default function EditCharacter({route}) {
    const {character} = route.params

    const id = character.id

    const [name, setName] = useState(character.name)

    const navigation = useNavigation()

    const {database} = useDatabase()

    const update = useCallback(async () => {
        try {
            if (name == "") {
                return alert("Campo nome obrigatório!")
            }

            await database.runAsync("UPDATE characters SET name = ? WHERE id = ?", [name, id])

            navigation.navigate("home")
        }
        
        catch (error) {
            console.error(error)
        }
    }, [database])

  return (
    <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Text style={{fontSize: 18}}>
            Editar Personagem
        </Text>

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, width: 300}}
            placeholder="Nome do personagem"
            value={name}
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
                    title="Editar"
                    color="green"
                    onPress={() => update()}
                />
            </View>
        </View>
    </View>
  )
}
