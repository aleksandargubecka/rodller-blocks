import './style.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;


// Register editor components
const {
	InnerBlocks,
} = wp.editor;

const {
	PanelColorSettings,
	InspectorControls,
} = wp.editor;

const template = [
	[ 'core/image' ],
	[ 'core/heading' ],
	[ 'core/paragraph' ],
];

// Register the block
registerBlockType( 'rodller/rodller-box', {
	title: __( 'Rodller Box', 'rodller-blocks' ),
	description: __( 'Add styled box.', 'rodller-blocks' ),
	icon: 'format-aside',
	category: 'widgets',
	keywords: [
		__( 'box', 'rodller-blocks' ),
		__( 'services', 'rodller-blocks' ),
		__( 'rodller', 'rodller-blocks' ),
	],
	attributes: {
		borderColor: {
			type: 'string',
			default: '#00d1b2'
		}
	},

	// Render the block components
	edit: (props) => {

		const { attributes: { borderColor }, setAttributes } = props;

		return ([
				<InspectorControls key="inspector">
					<PanelColorSettings
						title={ __( 'Border Top Color' ) }
						initialOpen={ true }
						colorSettings={ [ {
							value: borderColor,
							onChange: value => setAttributes( { borderColor: value } ),
							label: __( 'Border Top Color' ),
						} ] }
					>
					</PanelColorSettings>
				</InspectorControls>,
				<div className={'rodller-box'}>
					<InnerBlocks
						templateLock='all'
						template={template}
					/>
				</div>
			]
		);
	},

	// Save the attributes and markup
	save: function(props) {
		// Save the block markup for the front end
		const { attributes: { borderColor } } = props;
		return (
			<div className={'rodller-box'} style={ {
				'border-top-color': `${borderColor}`,
			} }>
				<InnerBlocks.Content/>
			</div>
		);
	},
} );