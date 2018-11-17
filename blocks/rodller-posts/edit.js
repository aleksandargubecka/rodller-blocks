import classnames from "classnames";

const { __ } = wp.i18n;

const {
    InspectorControls,
} = wp.editor;

const { Component } = wp.element;

const {
    PanelBody,
    ToggleControl,
    SelectControl,
    Spinner,
    QueryControls
} = wp.components;

const { withSelect } = wp.data;


class RodllerPostsBlock extends Component{
    constructor() {
        super( ...arguments );
    }

    render() {

        const {attributes: { layout, postsToShow, categories, order, orderBy, author, displayLoadMore }, className, setAttributes} = this.props;

        const {posts, categoriesList, authors} = this.props;

        const authorsList = ( authors.map( author => {
            return {
                label: author.name,
                value: author.id
            };
        } ) );

        const RenderPosts = (posts) => {
            if ( ! posts ) {
                return (
                    <p className={className} >
                        <Spinner />
                        { __( 'Loading Posts', 'rodller-blocks' ) }
                    </p>
                );
            }

            if ( 0 === posts.length ) {
                return <p>{ __( 'No Posts', 'rodller-blocks' ) }</p>;
            }

            return (
                <ul className={ className }>
                    { posts.map( post => {
                        return (
                            <li>
                                <a className={ className } href={ post.link }>
                                    { post.title.rendered }
                                </a>
                            </li>
                        );
                    }) }
                </ul>
            );
        };

        return [
            <InspectorControls>
                <PanelBody title={__('Roddler Posts Settings', 'rodller-blocks')}>
                    { rodller_blocks.layouts.length > 1 &&
                        <SelectControl
                            label={ __( 'Layout', 'rodller-blocks' ) }
                            options={ rodller_blocks.layouts }
                            value={ layout }
                            onChange={ ( value ) => this.props.setAttributes( { layout: value } ) }
                        />
                    }
                    <QueryControls
                        { ...{ order, orderBy } }
                        numberOfItems={ postsToShow }
                        categoriesList={ categoriesList }
                        selectedCategoryId={ categories }
                        onOrderChange={ ( value ) => setAttributes( { order: value } ) }
                        onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
                        onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
                        onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
                    />
                    { authorsList.length > 1 &&
                        <SelectControl
                            label={ __( 'Author', 'rodller-blocks' ) }
                            options={ authorsList }
                            value={ author }
                            onChange={ ( value ) => this.props.setAttributes( { author: value } ) }
                        />
                    }
                    <ToggleControl
                        label="Display Load More button"
                        help={ displayLoadMore ? '' : 'No fixed background.' }
                        checked={ displayLoadMore }
                        onChange={ ( value ) => this.props.setAttributes( { displayLoadMore: value } ) }
                    />
                </PanelBody>
            </InspectorControls>,
            <div>
                { RenderPosts(posts) }
            </div>
        ];
    }
}

export default withSelect( (select, props) => {

    const { postsToShow, categories, order, orderBy, author } = props.attributes;
    const { getEntityRecords, getAuthors } = select( 'core' );

    return {
        posts: getEntityRecords( 'postType', 'post', {
            per_page: parseInt(postsToShow),
            categories: categories,
            order: order,
            orderby: orderBy,
            exclude: parseInt(findGetParameter('post')),
            author: author
        } ),
        categoriesList: getEntityRecords( 'taxonomy', 'category', {per_page: 100} ),
        authors: getAuthors()
    };

} ) (RodllerPostsBlock);

function findGetParameter(parameterName) {
    let result = null,
        tmp = [];

    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });

    return result;
}