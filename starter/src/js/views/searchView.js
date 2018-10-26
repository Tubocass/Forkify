import {elements} from './base';

export const getInput = () => {
    return elements.searchInput.value;
 };

 export const clearInput = () => {
     elements.searchInput.value = '';
 };
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchPages.innerHTML = '';
}

// Pasta Rigatone with parm
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit)
    {
        title.split(' ').reduce((accum, curr) => {
            if(accum + curr.length <= limit)
            {
                newTitle.push(curr);
            }
            return accum + curr.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

 const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultsList.insertAdjacentHTML("beforeend", markup)
};

// type: previous or next
const CreateButton = (page, type) =>{
    return `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page - 1:page + 1}>
        <span>Page ${type === 'prev'? page - 1:page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left':'right'}"></use>
            </svg>
        </button>
    `;
}
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1)
    {
        //only button to next page
        button = CreateButton(page, 'next');
    }else if(page < pages){
        //both buttons
        button = `
        ${CreateButton(page, 'prev')}
        ${CreateButton(page, 'next')}
        `;
    }else if(page === pages && pages > 1){
        //only goto previous page
        button = CreateButton(page, 'prev');
    }
    elements.searchPages.insertAdjacentHTML('afterbegin', button);
}

 export const renderResulsts = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page-1) * resultsPerPage;
    const end = page * resultsPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resultsPerPage);
 };

