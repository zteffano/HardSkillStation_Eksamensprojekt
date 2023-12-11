
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
            return await response.ok // returnere en bool værdi om login er ok elller ej
        } catch (error) {
            console.log(error);
        }
    }

}
