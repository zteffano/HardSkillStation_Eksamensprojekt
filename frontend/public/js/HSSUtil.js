import { HSSApi } from "./HSSApi.js";

export class HSSUtil {


    static getById(array, id) {
        return array.find(element => element.id == id);
    }

    // Kan bruges til fx. at finde et username, eller anden info baseret på et id 
    static getByIdKey(array, id, key) {
        return array.find(element => element.id == id)[key];
    }
    
    static async accountWorkshopsWithNames() {
        let accountWorkshopsWithNames = [];
        let accountWorkshops = await HSSApi.getAccountWorkshops();
        let accounts = await HSSApi.getAccounts();
        let workshops = await HSSApi.getWorkshops();



            accountWorkshops.forEach(accountWorkshop => {
            let accountName = this.getByIdKey(accounts, accountWorkshop.accountId, 'username');
            let workshopName = this.getByIdKey(workshops, accountWorkshop.workshopId, 'name');
            accountWorkshopsWithNames.push({accountName, workshopName});
            return accountWorkshopsWithNames;
    
    });
    }
    static sortByDate(arrayToSort, ascending = false) {
   

        arrayToSort.sort((a, b) => {
            let workshopA = a.start;
            let workshopB = b.start;
            if (workshopA < workshopB) {
                return ascending? -1 : 1;
            }
            if (workshopA > workshopB) {
                return ascending? 1 : -1;
            }
            return 0;
        })
 
    }

 
}