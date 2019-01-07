import Inspector from './inspector';
// import './style.scss';
// import './editor.scss';

const {__} = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

registerBlockType('rodller/rodller-share', {
    title: __('Rodller Share', 'rodller-blocks'),
    description: __('Sharing buttons', 'rodller-blocks'),
    icon: 'grid-view',
    category: 'widgets',
    keywords: [
        __('share', 'rodller-blocks'),
        __('rodller', 'rodller-blocks'),
    ],
    edit: props => {

        // Setup the props
        const {
            attributes,
            isSelected,
            editable,
            className,
            setAttributes
        } = props;

        const {
            twitter,
            facebook,
            google,
            linkedin,
            pinterest,
            email,
            reddit,
        } = props.attributes;

        return [
            <Inspector { ...props }/>,
            <ul class="rodller-share-list">
                { twitter &&
                <li>
                    <a className='rodller-share-twitter' title={__( 'Share on Twitter', 'rodller-blocks' )}>
                        <i class="fab fa-twitter"></i>
                    </a>
                </li>
                }
                { facebook &&
                <li>
                    <a className='rodller-share-facebook' title={__( 'Share on Facebook', 'rodller-blocks' )}>
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </li>
                }
                { google &&
                <li>
                    <a className='ab-share-google' title={__( 'Share on Google', 'rodller-blocks' )}>
                        <i class="fab fa-google"></i>
                    </a>
                </li>
                }
                { pinterest &&
                <li>
                    <a className='ab-share-pinterest' title={__( 'Share on Pinterest', 'rodller-blocks' )}>
                        <i class="fab fa-pinterest-p"></i>
                    </a>
                </li>
                }
                { linkedin &&
                <li>
                    <a className='ab-share-linkedin' title={__( 'Share on LinkedIn', 'rodller-blocks' )}>
                        <i class="fab fa-linkedin"></i>
                    </a>
                </li>
                }
                { reddit &&
                <li>
                    <a className='ab-share-reddit' title={__( 'Share on reddit', 'rodller-blocks' )}>
                        <i class="fab fa-reddit-alien"></i>
                    </a>
                </li>
                }
                { email &&
                <li>
                    <a className='ab-share-email' title={__( 'Share via Email', 'rodller-blocks' )}>
                        <i class="fas fa-envelope"></i>
                    </a>
                </li>
                }
            </ul>
        ];
    },
    save() {
        // Rendered in PHP
        return null;
    },
});