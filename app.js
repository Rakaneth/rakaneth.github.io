let itemGroup = {
    functional: true,
    props: {
        label: {
            attributes: String,
            required: true
        },
        list: {
            attributes: Array,
            required: true
        }
    },
    render: (h, context) => {
        return h('optgroup', {
            attrs: {
                label: context.props.label
            }
        },
            context.props.list.map(function (item) {
                h('option', {
                    attrs: {
                        value: item
                    },
                },
                    item.title)
            })
        )
    }
}

let app = new Vue({
    el: '#app',
    data: {
        items: RIPDATA,
        knacks: KNACKS,
        selected: {},
        chosenKnacks: [],
        loadouts: [],
        curLoadout: [],
        scriptList: [
            getScriptsOfTier(0),
            getScriptsOfTier(1),
            getScriptsOfTier(2),
            getScriptsOfTier(3),
            getScriptsOfTier(4),
            getScriptsOfTier(5),
            getScriptsOfTier(6)
        ]
    },
    components: {
        'item-group': itemGroup
    }
})

