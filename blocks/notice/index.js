// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import NoticeBox from './notice';
import DismissButton from './button';
import icons from './icons';

// Import CSS
import './style.scss';
import './editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
    RichText,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    MediaUpload,
} = wp.editor;

// Register components
const {
    Button,
    SelectControl,
    withFallbackStyles,
    withState,
} = wp.components;

// Register the block
registerBlockType( 'rodller/rodller-notice', {
    title: __( 'Rodller Notice', 'rodller-blocks' ),
    description: __( 'Add a stylized text notice.', 'rodller-blocks' ),
    icon: 'format-aside',
    category: 'widgets',
    keywords: [
        __( 'notice', 'rodller-blocks' ),
        __( 'message', 'rodller-blocks' ),
        __( 'rodller', 'rodller-blocks' ),
    ],
    attributes: {
        noticeTitle: {
            type: 'string',
            selector: '.rodller-notice-title',
        },
        noticeContent: {
            type: 'array',
            selector: '.rodller-notice-text',
            source: 'children',
        },
        noticeAlignment: {
            type: 'string',
        },
        noticeBackgroundColor: {
            type: 'string',
            default: '#00d1b2'
        },
        noticeTextColor: {
            type: 'string',
            default: '#32373c'
        },
        noticeTitleColor: {
            type: 'string',
            default: '#fff'
        },
        noticeFontSize: {
            type: 'number',
            default: 18
        },
        noticeDismiss: {
            type: 'string',
            default: '',
        },
    },

    // Render the block components
    edit: (props) => {
            // Setup the attributes
            const {
                attributes: {
                    noticeTitle,
                    noticeContent,
                    noticeAlignment,
                    noticeBackgroundColor,
                    noticeTextColor,
                    noticeTitleColor,
                    noticeFontSize,
                    noticeDismiss
                },
                attributes,
                isSelected,
                editable,
                className,
                setAttributes
            } = props;

            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };

            return [
                // Show the alignment toolbar on focus
                <BlockControls key="controls">
                    <AlignmentToolbar
                        value={ noticeAlignment }
                        onChange={ ( value ) => setAttributes( { noticeAlignment: value } ) }
                    />
                </BlockControls>,
                // Show the block controls on focus
                <Inspector
                    { ...{ setAttributes, ...props } }
                />,
                // Show the block markup in the editor
                <NoticeBox { ...props }>
                    {	// Check if the notice is dismissable and output the button
                        noticeDismiss && (
                            <DismissButton { ...props }>
                                { icons.dismiss }
                            </DismissButton>
                        ) }

                    <RichText
                        tagName="p"
                        placeholder={ __( 'Notice Title', 'rodller-blocks' ) }
                        keepPlaceholderOnFocus
                        value={ noticeTitle }
                        className={ classnames(
                            'rodller-notice-title'
                        ) }
                        style={ {
                            color: noticeTitleColor,
                        } }
                        onChange={ ( value ) => setAttributes( { noticeTitle: value } ) }
                    />

                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'Add notice text...', 'rodller-blocks' ) }
                        value={ noticeContent }
                        className={ classnames(
                            'rodller-notice-text'
                        ) }
                        style={ {
                            borderColor: noticeBackgroundColor,
                        } }
                        onChange={ ( value ) => setAttributes( { noticeContent: value } ) }
                    />
                </NoticeBox>
            ];
    },

    // Save the attributes and markup
    save: function( props ) {

        // Setup the attributes
        const {
            noticeTitle,
            noticeContent,
            noticeAlignment,
            noticeBackgroundColor,
            noticeTextColor,
            noticeTitleColor,
            noticeFontSize,
            noticeDismiss
        } = props.attributes;

        // Save the block markup for the front end
        return (
            <NoticeBox { ...props }>
                { noticeDismiss && (
                    <DismissButton { ...props }>
                        { icons.dismiss }
                    </DismissButton>
                ) }

                { noticeTitle && (
                    <div
                        class="rodller-notice-title"
                        style={ {
                            color: noticeTitleColor
                        } }
                    >
                        <RichText.Content
                            tagName="p"
                            value={ noticeTitle }
                        />
                    </div>
                ) }

                { noticeContent && (
                    <RichText.Content
                        tagName="div"
                        class="rodller-notice-text"
                        style={ {
                            borderColor: noticeBackgroundColor
                        } }
                        value={ noticeContent }
                    />
                ) }
            </NoticeBox>
        );
    },
} );