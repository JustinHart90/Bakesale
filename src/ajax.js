const apiHost = 'https://bakesaleforgood.com';

export default {
    async fetchInitialDeals() {
        try {
            const response = await fetch(apiHost + '/api/deals');
            const responseJson = await response.json();
            return responseJson;
        } catch(e) {
            console.error(e);
        }
    },
    
    async fetchDealDetail(dealId) {
        try {
            const response = await fetch(apiHost + '/api/deals/' + dealId);
            const responseJson = await response.json();
            return responseJson;
        } catch(e) {
            console.error(e);
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