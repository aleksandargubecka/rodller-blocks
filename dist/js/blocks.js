'use strict';

var registerBlockType = wp.blocks.registerBlockType;
var RichText = wp.editor.RichText;


registerBlockType('rodller/accordion', {
    title: 'Accordion',

    icon: 'list-view',

    category: 'layout',

    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p'
        }
    },

    edit: function edit(_ref) {
        var attributes = _ref.attributes,
            className = _ref.className,
            setAttributes = _ref.setAttributes;
        var content = attributes.content;


        function onChangeContent(newContent) {
            setAttributes({ content: newContent });
        }

        return React.createElement(
            'div',
            null,
            React.createElement(RichText, {
                tagName: 'p',
                className: className,
                onChange: onChangeContent,
                value: content
            })
        );
    },
    save: function save(_ref2) {
        var attributes = _ref2.attributes,
            className = _ref2.className;
        var content = attributes.content;


        return React.createElement(
            'div',
            null,
            React.createElement(RichText.Content, {
                tagName: 'p',
                className: className,
                value: content
            })
        );
    }
});