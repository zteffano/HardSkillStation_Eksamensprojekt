import { HSSUtil } from "./HSSUtil.js";
import { HSSApi } from "./HSSApi.js";


export class Workshops {

    workshops =  [];
    oldWorkshops = [];
    newWorkshops = [];
    dagensDato = new Date();

    constructor() {
        // Bedre måde med HSSAPI klassen, så vi også fri for at have URL hardcoded i hver class if so.
        HSSApi.getWorkshops().then(data => {
            this.workshops = data;
            HSSUtil.sortByDate(this.workshops,true)
            this.getNewWorkshops();
            this.getOldWorkshops();
            
            
        });

    }

    getNewWorkshops() {

        this.newWorkshops = this.workshops.filter(element => {return new Date(element.start) >= this.dagensDato});


        return this.newWorkshops
    }

    getOldWorkshops() {

        this.oldWorkshops = this.workshops.filter(element => { return new Date(element.start) < this.dagensDato});

        return this.oldWorkshops
    }
    
    getWorkshopsByCategory(categoryId) {
        return this.workshops.filter(element => {return element.categoryId == categoryId});
    }
    

    searchWorkshops(searchString) {
        return this.workshops.filter(element => {return element.name.includes(searchString)});
    }
    
}



  