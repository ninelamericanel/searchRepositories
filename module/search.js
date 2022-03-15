export class Search {
    constructor(view) {
        this.view = view;
        this.view.input.addEventListener('input', this.debounce(this.searchRepositories.bind(this), 500));
    }

    async searchRepositories() {
        let value = this.view.input.value;
        if (value) {
            if (this.view.autocompleteBlock.childNodes) this.view.deleteAutocompletedNodes();
            let response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`);
            if (response.ok) {
                let json = await response.json();
                json.items.forEach(item => this.view.viewAutocomplete(item))
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