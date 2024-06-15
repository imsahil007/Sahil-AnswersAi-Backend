const https = require('https');
let content = [];
function isEmpty(value) {
    if (value === null || value === '') {
        return true;
    }

    if (Array.isArray(value)) {
        return value.some(v => isEmpty(v));
    }

    if (typeof value === 'object') {
        return Object.values(value).some(v => isEmpty(v));
    }

    return false;
}
function sortObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortObject).sort();
    }

    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = sortObject(obj[key]);
            return result;
        }, {});
}

jsonObject = jsonObject.map(sortObject);
https.get("https://coderbyte.com/api/challenges/json/wizard-list", (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        let jsonObject = JSON.parse(data);
        let seen = new Map();
        jsonObject = [{"name":"John","age":30,"city":"New York","country":"USA","Hobbies":["reading","swimming","hiking","swimming"],"occupation":"programmer","favorite_foods":{"Breakfast":"pancakes","Lunch":"","dinner":"pasta","Snack":""},"gear":{"type":"","material":"","color":null},"affiliations":["","",""],"friends":[{"name":"Jane","age":28,"city":"New York","country":"USA","occupation":null},{"name":"Tom","age":32,"city":"London","country":"UK","occupation":"teacher"},{"name":"Jane","age":28,"city":"New York","country":"USA","occupation":null}]}];
         jsonObject.map(sortObject);
        // .filter(obj => {
        //     // Remove if any value is null or empty
        //     if (Object.values(obj).some(value => isEmpty(value))) {
        //         return false;
        //     }

        //     // Remove if key and value are the same
        //     let stringifiedObj = JSON.stringify(obj);
        //     if (seen.has(stringifiedObj)) {
        //         return false;
        //     }
        //     seen.set(stringifiedObj, true);
        //     return true;
        // });

        console.log(JSON.stringify(jsonObject));
    });
});