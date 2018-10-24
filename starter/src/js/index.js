import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';
/*
    global state of app
    Search obj
    current recipe obj
    shopping list obj
    liked recipes
*/
const state = {};

const controlSearch = async () =>{
    
    // get query from view

   const query = searchView.getInput();
   console.log(query);

   if(query)
   {
       // new search obj and add to state 
       state.search = new Search(query)

       // prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
       // Search for recipes
       await state.search.getResults();

       // render results to UI
       console.log(state.search.result);
       searchView.renderResulsts(state.search.result)
   }
}

elements.searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    controlSearch();
})


