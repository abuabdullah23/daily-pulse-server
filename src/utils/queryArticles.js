class queryArticles {
    articles = []
    query = {}
    constructor(articles, query) {
        this.articles = articles
        this.query = query
    }

    publisherQuery = () => {
        this.articles = this.query.publisherSlug ? this.articles.filter((p) => p.publisher.slug === this.query.publisherSlug) : this.articles
        return this
    }

    tagQuery = () => {
        this.articles = this.query.tagValue ? this.articles.filter((t) => t?.tags.map((v) => v?.value) === this.query.tagValue) : this.articles
        return this
    }

    searchQuery = () => {
        this.articles = this.query.searchValue ? this.articles.filter((p) => p.title.toLowerCase().indexOf(this.query.searchValue.toLowerCase()) > -1) : this.articles
        return this
    }

    getArticles = () => {
        return this.articles
    }

    countArticles = () => {
        return this.articles.length;
    }
}

module.exports = queryArticles
