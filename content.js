async function translateText(text, targetLang) {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const result = await response.json();
    return result[0][0][0]; // Extract translated text
}

async function performTranslation() {
    //const element = document.getElementById('lablekey');
    const element = document.querySelector("#editLanguageValueKeyFrm table > tbody > tr > td:nth-child(2)");
    if (!element) {
        console.error("Element with ID 'lablekey' not found.");
        return;
    }
    const str = element.innerText || element.value;
    const text = str.split("_").map((res) => res.charAt(0).toUpperCase() + res.slice(1)).join(" "); // Join with a space or any desired 
    if (!text) {
        console.error("No text found in element with ID 'lablekey'.");
        return;
    }

    const translations = {
        english: 'en',
        hindi: 'hi',
        gujarati: 'gu',
        vietnamese: 'vi'
    };
    var i=0;
    for (const [name, lang] of Object.entries(translations)) {
        i++;
        const translatedText = await translateText(text, lang);
        //const targetElement = document.getElementsByName(name)[0];
        console.log("#editLanguageValueKeyFrm table > tbody > tr:nth-of-type("+i+") > td:nth-child(4) > input[type='text']");
        const targetElement = document.querySelector("#editLanguageValueKeyFrm table > tbody > tr:nth-of-type("+i+") > td:nth-child(4) > input[type='text']");
        if (targetElement) {
            targetElement.value = translatedText;
        } else {
            console.warn(`Element with name '${name}' not found.`);
        }
        
    }
}

performTranslation();

