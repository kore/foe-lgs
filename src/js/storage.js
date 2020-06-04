class Storage {
    load (item) {
        try {
            const serializedState = window.localStorage.getItem(item);
            if (serializedState === null) {
                return undefined
            }
            return JSON.parse(serializedState)
        } catch (error) {
            console.warn(error)
            return undefined
        }
    }

    save (item, value) {
        try {
            const serializedState = JSON.stringify(value)
            window.localStorage.setItem(item, serializedState)
        } catch (error) {
            console.error(error)
        }
    }
}

export default Storage
