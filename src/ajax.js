const apiHost = 'https://bakesaleforgood.com';

export default {
    async fetchInitialDeals() {
        try {
            let response = await fetch(apiHost + '/api/deals');
            let responseJson = await response.json();
            return response;
        } catch(e) {
            console.log(e);
        }
    }
}

// fetch('https://mywebsite.com/endpoint/', {
//     method: 'POST',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         firstParam: 'yourValue',
//         secondParam: 'yourOtherValue',
//     }),
// });