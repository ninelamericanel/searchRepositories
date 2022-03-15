class View {
    constructor() {
        this.root = document.getElementById('root');
        this.searchBlock = this.createElement('div', 'search');
        this.root.append(this.searchBlock);

        this.input = this.createElement('input', 'search__input');
        this.searchBlock.append(this.input);

        this.autocompleteBlock = this.createElement('ul', 'search__autocomplete');
        this.searchBlock.append(this.autocompleteBlock);

    }

    createElement(tag, className) {
        let newElement = document.createElement(tag);
        if (className) newElement.className = className;
        return newElement;
    }

    viewAutocomplete(name) {
        let autocompletedItem = this.createElement('li', 'search__item');
        autocompletedItem.innerHTML = name;

        this.autocompleteBlock.append(autocompletedItem);
    }

    deleteAutocompletedNodes() {
        let autocompletedNodes = [...this.autocompleteBlock.childNodes];
        autocompletedNodes.forEach(node => node.remove());
    }

}

class Search {
    constructor(view) {
        this.view = view;
        this.view.input.addEventListener('input', this.debounce(this.searchRepositories.bind(this), 500))
    }

    async searchRepositories() {
        let value = this.view.input.value;
        if (value) {
            let response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`);
            if (response.ok) {
                let json = await response.json();
                json.items.forEach(item => this.view.viewAutocomplete(item.name))
            } else {
                return `Error ${response.status}`;
            }
        } else {
            this.view.deleteAutocompletedNodes();
        }
    }

    debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };
}

new Search(new View());

//
// createElement('div', "search", '.root');
// createElement('input', "search__input", '.search', 'text', 'Type to search...');
//
//
// input.addEventListener('input', () => {
//         let value = input.value;
//         if (value) {
//             getRepositories(value)
//                 .then(result => createListOfAutocomplete(result.items));
//         } else {
//             createListOfAutocomplete();
//         }
//     }
// );
//
// function createListOfAutocomplete(items) {
//     if (items) {
//         createElement('ul', 'search__autocomplete', '.search');
//         items.forEach((item, i) => {
//             let nodeElement = createElement('li', `search__item--${i}`, '.search__autocomplete')
//             nodeElement.innerHTML = item.name;
//         })
//     } else {
//         let list = document.querySelector('.search__autocomplete');
//         list.remove()
//     }
// }
//
// function createListOfAddedRepositories() {
//
// }
//
//
// async function getRepositories(text) {
//     let response = await fetch(`https://api.github.com/search/repositories?q=${text}&per_page=5`);
//     if (response.ok) {
//         let json = await response.json();
//         return json;
//     } else {
//         return `Error ${response.status}`;
//     }
// }
//

//
//
