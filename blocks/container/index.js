// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import Container from './container';

// Import CSS
import './style.scss';
import './editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    MediaUpload,
    RichText,
    InnerBlocks,
} = wp.editor;

// Register components
const {
    Button,
    withFallbackStyles,
    IconButton,
    Dashicon,
    withState,
    Toolbar,
} = wp.components;

const blockAttributes = {
    containerPaddingTop: {
        type: 'number',
        default: 0,
    },
    containerPaddingRight: {
        type: 'number',
        default: 0,
    },
    containerPaddingBottom: {
        type: 'number',
        default: 0,
    },
    containerPaddingLeft: {
        type: 'number',
        default: 0,
    },
    containerMarginTop: {
        type: 'number',
        default: 0,
    },
    containerMarginBottom: {
        type: 'number',
        default: 0,
    },
    containerWidth: {
        type: 'string',
        default: 'center',
    },
    containerMaxWidth: {
        type: 'number',
        default: 1600,
    },
    containerBackgroundColor: {
        type: 'string',
        default: '#fff',
    },
    containerImgURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
    },
    containerImgID: {
        type: 'number',
    },
    containerImgAlt: {
        type: 'string',
        source: 'attribute',
        attribute: 'alt',
        selector: 'img',
    },
    containerDimRatio: {
        type: 'number',
        default: 50,
    },
};

class RodllerContainerBlock extends Component {

    render() {

        // Setup the attributes
        const {
            attributes: {
                containerPaddingTop,
                containerPaddingRight,
                containerPaddingBottom,
                containerPaddingLeft,
                containerMarginTop,
                containerMarginBottom,
                containerWidth,
                containerMaxWidth,
                containerBackgroundColor,
                containerImgURL,
                containerImgID,
                containerImgAlt,
                containerDimRatio,
            },
            attributes,
            isSelected,
            editable,
            className,
            setAttributes
        } = this.props;

        const onSelectImage = img => {
            setAttributes( {
                containerImgID: img.id,
                containerImgURL: img.url,
                containerImgAlt: img.alt,
            } );
        };

        return [
            // Show the alignment toolbar on focus
            <BlockControls>
                <BlockAlignmentToolbar
                    value={ containerWidth }
                    onChange={ containerWidth => setAttributes( { containerWidth } ) }
                    controls={ [ 'center', 'full' ] }
                />
            </BlockControls>,
            // Show the block controls on focus
            <Inspector
                { ...{ setAttributes, ...this.props } }
            />,
            // Show the container markup in the editor
            <Container { ...this.props }>
                <div class="rodller-container-inside">
                    { containerImgURL && !! containerImgURL.length && (
                        <div class="rodller-container-image-wrap">
                            <img
                                className={ classnames(
                                    'rodller-container-image',
                                    dimRatioToClass( containerDimRatio ),
                                    {
                                        'has-background-dim': containerDimRatio !== 0,
                                    }
                                ) }
                                src={ containerImgURL }
                                alt={ containerImgAlt }
                            />
                        </div>
                    ) }

                    <div
                        class="rodller-container-content"
                        style={ {
                            maxWidth: `${containerMaxWidth}px`,
                        } }
                    >
                        <InnerBlocks />
                    </div>
                </div>
            </Container>
        ];
    }
}

// Register the block
registerBlockType( 'rodller/rodller-container', {
    title: __( 'Rodller Container', 'rodller-blocks' ),
    description: __( 'Add a container block to wrap several blocks in a parent container.', 'rodller-blocks' ),
    icon: 'editor-table',
    category: 'widgets',
    keywords: [
        __( 'container', 'rodller-blocks' ),
        __( 'section', 'rodller-blocks' ),
        __( 'rodller', 'rodller-blocks' ),
    ],

    attributes: blockAttributes,

    getEditWrapperProps( { containerWidth } ) {
        if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
            return { 'data-align': containerWidth };
        }
    },

    // Render the block components
    edit: RodllerContainerBlock,

    // Save the attributes and markup
    save: function( props ) {

        // Setup the attributes
        const {
            containerPaddingTop,
            containerPaddingRight,
            containerPaddingBottom,
            containerPaddingLeft,
            containerMarginTop,
            containerMarginBottom,
            containerWidth,
            containerMaxWidth,
            containerBackgroundColor,
            containerImgURL,
            containerImgID,
            containerImgAlt,
            containerDimRatio,
        } = props.attributes;

        // Save the block markup for the front end
        return (
            <Container { ...props }>
                <div class="rodller-container-inside">
                    { containerImgURL && !! containerImgURL.length && (
                        <div class="rodller-container-image-wrap">
                            <img
                                className={ classnames(
                                    'rodller-container-image',
                                    dimRatioToClass( containerDimRatio ),
                                    {
                                        'has-background-dim': containerDimRatio !== 0,
                                    }
                                ) }
                                src={ containerImgURL }
                                alt={ containerImgAlt }
                            />
                        </div>
                    ) }

                    <div
                        class="rodller-container-content"
                        style={ {
                            maxWidth: `${containerMaxWidth}px`,
                        } }
                    >
                        <InnerBlocks.Content />
                    </div>
                </div>
            </Container>
        );
    },
} );

function dimRatioToClass( ratio ) {
    return ( ratio === 0 || ratio === 50 ) ?
        null :
        'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
    return url ?
        { backgroundImage: `url(${ url })` } :
        undefined;
}