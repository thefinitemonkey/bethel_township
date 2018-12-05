export const pageContentError = (page, message) => {
    this.message = message;
    this.page = page;
    this.toString = function() {
        return `Error retrieving data for page ${this.page}: ${this.message}`;
    }
}