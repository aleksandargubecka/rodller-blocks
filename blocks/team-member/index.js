
// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './inspector';
import ProfileBox from './profile';
import SocialIcons from './social';
import AvatarColumn from './avatar';
import icons from './icons';

// Import styles
import './style.scss';
import './editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register components
const {
    RichText,
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    MediaUpload,
} = wp.editor;

// Register Inspector components
const {
    Button,
} = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

// Register the block
registerBlockType( 'rodller/rodller-profile-box', {
    title: __( 'Rodller Profile', 'rodller-blocks' ),
    description: __( 'Add a profile box with bio info and social media links.', 'rodller-blocks' ),
    icon: 'admin-users',
    category: 'widgets',
    keywords: [
        __( 'author', 'rodller-blocks' ),
        __( 'team', 'rodller-blocks' ),
        __( 'rodller', 'rodller-blocks' ),
    ],
    // Setup the block attributes
    attributes: {
        profileName: {
            type: 'array',
            source: 'children',
            selector: '.rodller-profile-name',
        },
        profileTitle: {
            type: 'array',
            source: 'children',
            selector: '.rodller-profile-title',
        },
        profileContent: {
            type: 'array',
            selector: '.rodller-profile-text',
            source: 'children',
        },
        profileAlignment: {
            type: 'string',
        },
        profileImgURL: {
            type: 'string',
            source: 'attribute',
            attribute: 'src',
            selector: 'img',
        },
        profileImgID: {
            type: 'number',
        },
        profileAvatarShape: {
            type: 'string',
            default: 'square',
        },
        profileLayout: {
            type: 'string',
            default: 'horizontal',
        },
        twitter: {
            type: 'url',
        },
        facebook: {
            type: 'url',
        },
        instagram: {
            type: 'url',
        },
        pinterest: {
            type: 'url',
        },
        google: {
            type: 'url',
        },
        youtube: {
            type: 'url',
        },
        github: {
            type: 'url',
        },
        linkedin: {
            type: 'url',
        },
        email: {
            type: 'url',
        },
        website: {
            type: 'url',
        },
    },

    // Render the block components
    edit: props => {

        // Setup the attributes
        const {
            attributes: {
                profileName,
                profileTitle,
                profileContent,
                profileAlignment,
                profileImgURL,
                profileImgID,
                profileAvatarShape,
                twitter,
                facebook,
                instagram,
                pinterest,
                google,
                youtube,
                github,
                email,
                website
            },
            attributes,
            isSelected,
            editable,
            className,
            setAttributes
        } = props;

        return [
            // Show the block alignment controls on focus
            <BlockControls key="controls">
                <AlignmentToolbar
                    value={ profileAlignment }
                    onChange={ ( value ) => setAttributes( { profileAlignment: value } ) }
                />
            </BlockControls>,
            // Show the block controls on focus
            <Inspector
                { ...{ setAttributes, ...props } }
            />,
            // Show the block markup in the editor
            <ProfileBox { ...props }>
                <AvatarColumn { ...props }>
                    <div className={"rodller-profile-image-" + profileAvatarShape}>
                        <MediaUpload
                            buttonProps={ {
                                className: 'change-image'
                            } }
                            onSelect={ ( img ) => setAttributes(
                                    {
                                        profileImgID: img.id,
                                        profileImgURL: img.sizes.medium !== undefined && img.sizes.medium.url !== undefined ? img.sizes.medium.url : img.url,
                                    }
                                )
                            }
                            allowed={ ALLOWED_MEDIA_TYPES }
                            type="image"
                            value={ profileImgID }
                            render={ ( { open } ) => (
                                <Button onClick={ open }>
                                    { ! profileImgID ? icons.upload : <img
                                        className="rodller-profile-avatar"
                                        src={ profileImgURL }
                                        alt="avatar"
                                    />  }
                                </Button>
                            ) }
                        >
                        </MediaUpload>
                    </div>
                </AvatarColumn>

                <div
                    className={ classnames(
                        'rodller-profile-column rodller-profile-content-wrap'
                    ) }
                >
                    <RichText
                        tagName="h2"
                        placeholder={ __( 'Add name', 'rodller-blocks' ) }
                        keepPlaceholderOnFocus
                        value={ profileName }
                        className='rodller-profile-name'
                        onChange={ ( value ) => setAttributes( { profileName: value } ) }
                    />

                    <RichText
                        tagName="p"
                        placeholder={ __( 'Add title', 'rodller-blocks' ) }
                        keepPlaceholderOnFocus
                        value={ profileTitle }
                        className='rodller-profile-title'
                        onChange={ ( value ) => setAttributes( { profileTitle: value } ) }
                    />

                    <RichText
                        tagName="div"
                        className='rodller-profile-text'
                        multiline="p"
                        placeholder={ __( 'Add profile text...', 'rodller-blocks' ) }
                        keepPlaceholderOnFocus
                        value={ profileContent }
                        formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
                        onChange={ ( value ) => setAttributes( { profileContent: value } ) }
                    />

                    <SocialIcons { ...props } />
                </div>
            </ProfileBox>
        ];
    },

    // Save the block markup
    save: function( props ) {

        // Setup the attributes
        const { profileName, profileTitle, profileContent, profileAlignment, profileImgURL, profileImgID, profileAvatarShape, twitter, facebook, instagram, pinterest, google, youtube, github, linkedin, email, website } = props.attributes;

        return (
            // Save the block markup for the front end
            <ProfileBox { ...props }>

                { profileImgURL && (
                    <AvatarColumn { ...props }>
                        <div className={'rodller-profile-image-' + profileAvatarShape}>
                            <img
                                className="rodller-profile-avatar"
                                src={ profileImgURL }
                                alt="avatar"
                            />
                        </div>
                    </AvatarColumn>
                ) }

                <div
                    className={ classnames(
                        'rodller-profile-column rodller-profile-content-wrap'
                    ) }
                >
                    { profileName && (
                        <RichText.Content
                            tagName="h2"
                            className="rodller-profile-name"
                            value={ profileName }
                        />
                    ) }

                    { profileTitle && (
                        <RichText.Content
                            tagName="p"
                            className="rodller-profile-title"
                            value={ profileTitle }
                        />
                    ) }

                    { profileContent && (
                        <RichText.Content
                            tagName="div"
                            className="rodller-profile-text"
                            value={ profileContent }
                        />
                    ) }

                    <SocialIcons { ...props } />
                </div>
            </ProfileBox>
        );
    },
} );