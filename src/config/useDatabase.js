import * as SQLite from 'expo-sqlite'
import { useCallback } from "react"

export default function useDatabase() {
    const database = SQLite.openDatabaseSync('database.db')

    const initialize = useCallback(async () => {
        try {
            await database.execAsync(`
                CREATE TABLE IF NOT EXISTS characters(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                )
            `)
        }
            
        catch (error) {
            console.error(error)
        }
    }, [database])

    return {
        database,
        initialize
    }
}
