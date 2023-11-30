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

    // skip = () => {
    //     let { pageNumber } = this.query;
    //     const skipPage = (parseInt(pageNumber) - 1) * this.query.perPage

    //     let skipArticles = []

    //     for (let i = skipPage; i < this.articles.length; i++) {
    //         skipArticles.push(this.articles[i])
    //     }
    //     this.articles = skipArticles
    //     return this
    // }

    // limit = () => {
    //     let temp = []
    //     if (this.articles.length > this.query.perPage) {
    //         for (let i = 0; i < this.query.perPage; i++) {
    //             temp.push(this.articles[i])
    //         }
    //     } else {
    //         temp = this.articles
    //     }
    //     this.articles = temp
    //     return this
    // }

    skip = () => {
        const { pageNumber } = this.query;
        const skipPage = (parseInt(pageNumber) - 1) * this.query.perPage;

        this.articles = this.articles.slice(skipPage);
        return this;
    };

    limit = () => {
        const { perPage } = this.query;

        if (this.articles.length > perPage) {
            this.articles = this.articles.slice(0, perPage);
        }

        return this;
    };

    getArticles = () => {
        return this.articles
    }

    countArticles = () => {
        return this.articles.length;
    }
}

module.exports = queryArticles
