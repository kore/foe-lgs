class Storage {
    load (item) {
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

    save (item, value) {
        try {
            const serializedState = JSON.stringify(value)
            window.localStorage.setItem(item, serializedState)
        } catch {
            // ignore write errors
        }
    }
}

export default Storage
