const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'rodller/accordion', {
    title: 'Accordion',

    icon: 'list-view',

    category: 'layout',

    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
    },

    edit( {attributes, className, setAttributes} ) {
        const { content } = attributes;

        function onChangeContent( newContent ) {
            setAttributes( { content: newContent } );
        }

        return <div>
            <RichText
                tagName="p"
                className={ className }
                onChange={ onChangeContent }
                value={ content }
            />
        </div>;
    },

    save( { attributes, className } ) {
        const { content } = attributes;

        return (
            <div>
                <RichText.Content
                    tagName="p"
                    className={ className }
                    value={ content }
                />
            </div>
        );
    },
} );
