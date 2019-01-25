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
            <ul className="rodller-share-list">
                { twitter &&
                <li key={''}>
                    <a className='rodller-share-twitter' title={__( 'Share on Twitter', 'rodller-blocks' )}>
                        <i className="fab fa-twitter"></i>
                    </a>
                </li>
                }
                { facebook &&
                <li key={'rodller-share-facebook'}>
                    <a className='rodller-share-facebook' title={__( 'Share on Facebook', 'rodller-blocks' )}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </li>
                }
                { google &&
                <li key={'rodller-share-google'}>
                    <a className='rodller-share-google' title={__( 'Share on Google', 'rodller-blocks' )}>
                        <i className="fab fa-google"></i>
                    </a>
                </li>
                }
                { pinterest &&
                <li key={'rodller-share-pinterest'}>
                    <a className='rodller-share-pinterest' title={__( 'Share on Pinterest', 'rodller-blocks' )}>
                        <i className="fab fa-pinterest-p"></i>
                    </a>
                </li>
                }
                { linkedin &&
                <li key={'rodller-share-linkedin'}>
                    <a className='rodller-share-linkedin' title={__( 'Share on LinkedIn', 'rodller-blocks' )}>
                        <i className="fab fa-linkedin"></i>
                    </a>
                </li>
                }
                { reddit &&
                <li key={'rodller-share-reddit'}>
                    <a className='rodller-share-reddit' title={__( 'Share on reddit', 'rodller-blocks' )}>
                        <i className="fab fa-reddit-alien"></i>
                    </a>
                </li>
                }
                { email &&
                <li key={'rodller-share-email'}>
                    <a className='rodller-share-email' title={__( 'Share via Email', 'rodller-blocks' )}>
                        <i className="fas fa-envelope"></i>
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