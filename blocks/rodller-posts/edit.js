import classnames from "classnames";

const { __ } = wp.i18n;

const {
    InspectorControls,
} = wp.editor;

const { Component } = wp.element;

const {
    Fragment,
    Toolbar,
    Button,
    Tooltip,
    RangeControl,
    PanelBody,
    PanelRow,
    FormToggle,
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

        const {attributes: { layout, postsPerPage }, className, setAttributes} = this.props;

        const {posts, categoriesList} = this.props;

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
                    <RangeControl
                        label={ __( 'Number of posts', 'rodller-blocks'  ) }
                        value={ postsPerPage }
                        onChange={ ( value ) => setAttributes( { postsPerPage: value } ) }
                        min={ 1 }
                        max={ 30 }
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

    const { postsPerPage, categories } = props.attributes;
    const { getEntityRecords } = select( 'core' );

    return {
        posts: getEntityRecords( 'postType', 'post', {
            per_page: parseInt(postsPerPage),
            exclude: parseInt(findGetParameter('post')),
            category: typeof categories !== "undefined" ? parseInt(categories) : 6
        } ),
        categoriesList: getEntityRecords( 'taxonomy', 'category', {per_page: 100} ),
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