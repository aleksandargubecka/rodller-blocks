import classnames from "classnames";

const {__} = wp.i18n;

const {
    InspectorControls,
} = wp.editor;

const {Component} = wp.element;

const {decodeEntities} = wp.htmlEntities;

const {
    PanelBody,
    ToggleControl,
    SelectControl,
    Spinner,
    QueryControls
} = wp.components;

const {withSelect} = wp.data;

class RodllerPostsBlockEdit extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {attributes: {layout, postsToShow, categories, order, orderBy, author, displayLoadMore}, className, setAttributes} = this.props;

        const {posts, categoriesList, authors} = this.props;

        let layoutOptions = [];

        Object.keys(rodller_blocks.layouts).map((objectKey) => {
            layoutOptions.push({
                value: rodller_blocks.layouts[objectKey].value,
                label: rodller_blocks.layouts[objectKey].label,
            })
        });

        const authorsList = (authors.map(singleAuthor => {
            return {
                label: singleAuthor.name,
                value: singleAuthor.id
            };
        }));

        const RenderPosts = (posts) => {

            if (!posts) {
                return (
                    <p className={className}>
                        <Spinner/>
                        {__('Loading Posts', 'rodller-blocks')}
                    </p>
                );
            }

            if (0 === posts.length) {
                return <p>{__('No Posts', 'rodller-blocks')}</p>;
            }

            let postsClassCounter = 0;

            return [
                <ul className={'rodller-blocks-posts row'}>
                    {posts.map( (post) => {

                        let liClass = {};

                        liClass['layout-' + layout] = true;
                        liClass['col-' + rodller_blocks.layouts[layout].columns[postsClassCounter]] = true;

                        if((rodller_blocks.layouts[layout].columns.length - 1) === postsClassCounter){
                            postsClassCounter = 0;
                        }else{
                            postsClassCounter++;
                        }


                        return (
                            <li className={classnames(liClass)}>
                                {
                                    rodller_blocks.layouts[layout].order.map((layoutOrder) => {
                                        switch (layoutOrder) {
                                            case 'image':
                                                if( post.featured_image_sizes_url !== undefined && post.featured_image_sizes_url && post.featured_image_sizes_url[rodller_blocks.layouts[layout].image_size] != null ){
                                                    return <div className="rodller-blocks-post-image">
                                                        <a href={post.link} target="_blank" rel="bookmark">
                                                            <img src={post.featured_image_sizes_url[rodller_blocks.layouts[layout].image_size]} alt={decodeEntities(post.title.rendered.trim()) || __('(Untitled)', 'rodller-blocks')}/>
                                                        </a>
                                                    </div>;
                                                }
                                                break;
                                            case 'title':
                                                return <a className={'rodller-posts-title'} href={post.link} target="_blank" rel="bookmark">
                                                    <h2>{post.title.rendered}</h2>
                                                </a>;
                                            case 'meta':
                                                if (post.meta.length > 0) {
                                                    return <div className={'rodller-blocks-metadata'}>
                                                        {post.meta.map(singleMeta => {
                                                            return (
                                                                {singleMeta}
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                }
                                                break;
                                            case 'excerpt':
                                                return <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} className={'rodller-posts-expert'}/>;
                                        }
                                    })
                                }
                            </li>
                        );
                    })}
                </ul>,
                <div>
                    {displayLoadMore &&
                    <a className={'rodller-blocks-load-more-button'}>{__('Load More', 'rodller-blocks')}</a>
                    }
                </div>
            ];
        };

        return [
            <InspectorControls>
                <PanelBody title={__('Roddler Posts Settings', 'rodller-blocks')}>
                    {layoutOptions.length > 1 &&
                    <SelectControl label={__('Layout', 'rodller-blocks')} options={layoutOptions} value={layout} onChange={(value) => this.props.setAttributes({layout: value})}/>
                    }
                    <QueryControls
                        {...{
                            order,
                            orderBy
                        }} numberOfItems={postsToShow} categoriesList={categoriesList} selectedCategoryId={categories} onOrderChange={(value) => setAttributes({order: value})} onOrderByChange={(value) => setAttributes({orderBy: value})} onCategoryChange={(value) => setAttributes({categories: '' !== value ? value : undefined})} onNumberOfItemsChange={(value) => setAttributes({postsToShow: value})}/>
                    {authorsList.length > 1 &&
                    <SelectControl label={__('Author', 'rodller-blocks')} options={authorsList} value={author} onChange={(value) => this.props.setAttributes({author: value})}/>
                    }
                    <ToggleControl label={__('Display Load More button', 'rodller-blocks')} checked={displayLoadMore} onChange={(value) => this.props.setAttributes({displayLoadMore: value})}/>
                </PanelBody>
            </InspectorControls>,
            <div>
                {RenderPosts(posts)}
            </div>
        ];
    }
}

export default withSelect((select, props) => {

    const {postsToShow, categories, order, orderBy, author, layout} = props.attributes;
    const {getEntityRecords, getAuthors} = select('core');

    return {
        posts: getEntityRecords('postType', 'post', {
            per_page: parseInt(postsToShow),
            categories: categories,
            order: order,
            orderby: orderBy,
            author: author,
        }),
        categoriesList: getEntityRecords('taxonomy', 'category', {per_page: 100}),
        authors: getAuthors()
    };

})(RodllerPostsBlockEdit);