// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';

// Import CSS
// import './styles/style.scss';
// import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const {
    registerBlockType,
    createBlock,
} = wp.blocks;

// Register editor components
const {
    RichText,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    InnerBlocks,
} = wp.editor;

// Register components
const {
    Button,
    withFallbackStyles,
    IconButton,
    Dashicon,
} = wp.components;


// Register the block
registerBlockType( 'rodller/rodller-accordion', {
    title: __( 'Rodller Accordion', 'rodller-blocks' ),
    description: __( 'Add accordion block with a title and text.', 'rodller-blocks' ),
    icon: 'editor-ul',
    category: 'widgets',
    keywords: [
        __( 'accordion', 'rodller-blocks' ),
        __( 'list', 'rodller-blocks' ),
        __( 'rodller', 'rodller-blocks' ),
    ],
    attributes:  {
        accordionTitle: {
            type: 'array',
            selector: '.rodller-accordion-title',
            source: 'children',
        },
        accordionAlignment: {
            type: 'string',
        },
        accordionOpen: {
            type: 'boolean',
            default: false
        },
    },

    // Render the block components
    edit: props => {

        // Setup the attributes
        const { attributes: { accordionTitle, accordionAlignment, accordionOpen }, isSelected, className, setAttributes } = props;

        return [
            // Show the block alignment controls on focus
            <BlockControls key="controls">
                <AlignmentToolbar
                    value={ accordionAlignment }
                    onChange={ ( value ) => setAttributes( { accordionAlignment: value } ) }
                />
            </BlockControls>,
            // Show the block controls on focus
            <Inspector
                { ...props }
            />,
            // Show the button markup in the editor
            <div
                className={ classnames(
                    props.className,
                    accordionAlignment,
                    'rodller-block-accordion',
                ) }
            >
                <RichText
                    tagName="p"
                    placeholder={ __( 'Accordion Title', 'rodller-blocks' ) }
                    value={ accordionTitle }
                    className="rodller-accordion-title"
                    onChange={ ( value ) => setAttributes( { accordionTitle: value } ) }
                />
                <div className="rodller-accordion-text">
                    <InnerBlocks/>
                </div>
            </div>
        ];
    },

    // Save the attributes and markup
    save: function( props ) {

        // Setup the attributes
        const { accordionTitle, accordionAlignment, accordionOpen } = props.attributes;

        // Save the block markup for the front end
        return (
            <div
                className={ classnames(
                    props.className,
                    accordionAlignment,
                    'rodller-block-accordion',
                ) }
            >
                <details open={accordionOpen}>
                    <summary class="rodller-accordion-title">
                        <RichText.Content
                            value={ accordionTitle }
                        />
                    </summary>
                    <div class="rodller-accordion-text">
                        <InnerBlocks.Content />
                    </div>
                </details>
            </div>
        );
    },
} );