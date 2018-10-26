import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
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
        renderLoader(elements.searchResults);
       // Search for recipes
       await state.search.getResults();

       // render results to UI
       //console.log(state.search.result);
       clearLoader();
       searchView.renderResulsts(state.search.result)
   }
};

elements.searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    controlSearch();
});

elements.searchPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if(btn)
    {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        console.log(gotoPage);
        searchView.clearResults();
        searchView.renderResulsts(state.search.result, gotoPage);
    }
});
