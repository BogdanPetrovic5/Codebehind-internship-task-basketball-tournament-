
const { group, error } = require('console');
const { Data } = require('../service/DataService.js');
const { Tournament } = require('./Tournament.js');

class App{
    
    constructor(){
       this._dataService = new Data()
       this._tournament = new Tournament()
       this._groups = {}
    }


    async main(){
        
        try{
            this._groups = await this._dataService.fetchData();
        }catch{
            console.error(error);
        }
      
        if(this._groups){
            this._tournament.start(this._groups);
        }
    }
}

const app = new App();

app.main();