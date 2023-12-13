
export class HSSApi {

    static async getWorkshops() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/workshopsjoined");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getCategories() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/categories");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getCompanies() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/companies");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getLocations() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/locations");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccounts() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/accounts");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccount(id) {
        try {
            const response = await fetch(`http://hss.zteffano.dk:1337/account/${id}`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountTypes() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/accounttypes");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountWorkshops() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/accountworkshops");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async checkLogin(username, password) {
        try {
            const response = await fetch(`http://hss.zteffano.dk:1337/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            return await response // returnere en bool værdi om login er ok elller ej
        } catch (error) {
            console.log(error);
        }
    }

    static async createAccount(username, password, email, accountTypeId=2) { // accountType default er 2, som er en bruger
        try {
            const response = await fetch(`http://hss.zteffano.dk:1337/createaccount`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password, email, accountTypeId})
            });
            return await response.ok // returnere en bool om det lykkedes at oprette bruger
        } catch (error) {
            console.log(error);
        }
    }
    // get hvilke workshops en account er tilmeldt
    static async getAccountWorkshops(accountId) {
        try {
            const response = await fetch(`http://hss.zteffano.dk:1337/account/${accountId}/workshops`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async addWorkshopToAccount(accountId, workshopId) {
        try {
            const response = await fetch(`http://hss.zteffano.dk:1337/createaccountworkshop`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({accountId, workshopId})
            });
            return await response.ok 
        } catch (error) {
            console.log(error);
        }
    }


   static async deleteWorkshopFromAccount(accountId, workshopId) {
    try {
        const response = await fetch(`http://hss.zteffano.dk:1337/deleteaccountworkshop/${accountId}/${workshopId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.ok 
    } catch (error) {
        console.log(error);
    } 
}

}
