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
        fundamentals: getScriptsOfTier(0),
        tier1: getScriptsOfTier(1),
        tier2: getScriptsOfTier(2),
        tier3: getScriptsOfTier(3),
        tier4: getScriptsOfTier(4),
        tier5: getScriptsOfTier(5),
        tier6: getScriptsOfTier(6)
    },
    components: {
        'item-group': itemGroup
    }
})

