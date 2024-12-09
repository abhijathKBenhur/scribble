const getStorageSection = (section) =>{
    let storage = localStorage.getItem("scribble") || "{}"
    let storageObject;
    try{
        storageObject = JSON.parse(storage);
    }catch(error){
        storageObject = {};
    }
    return storageObject[section] || []
}

const setStorageSection = (object, section) =>{
    let storage = localStorage.getItem("scribble") || "{}"
    let storageObject;
    try{
        storageObject = JSON.parse(storage);
    }catch(error){
        storageObject = {};
    }
    storageObject[section] = object;
    localStorage.setItem("scribble", JSON.stringify(storageObject))
}

export {
    getStorageSection,
    setStorageSection
}