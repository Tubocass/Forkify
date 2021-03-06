import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(query) {
        const key = '6551566fdc9b84e54fc227d4d65be23e';
   
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error){
            alert(error)
        }
    }
}


//6551566fdc9b84e54fc227d4d65be23e 
//https://www.food2fork.com/api/search