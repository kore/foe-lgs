class Storage {
    load (item: string): string|number|boolean|Date|Json|JsonArray {
        try {
            const serializedState = window.localStorage.getItem(item);
            if (serializedState === null) {
                return undefined
            }
            return JSON.parse(serializedState)
        } catch (error) {
            return undefined
        }
    }

    save (item: string, value: string|number|boolean|Date|Json|JsonArray): void {
        try {
            const serializedState = JSON.stringify(value)
            window.localStorage.setItem(item, serializedState)
        } catch {
            // Ignore
        }
    }
}

export default Storage
