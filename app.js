
let loadoutDisplay = {
    props: ['loadout'],
    template: `
        <fieldset id='loadout' class='section'>
            <legend>Current Loadout</legend>
            <ul>
                <li v-for='item in loadout'>{{ item.title }}, <em>{{ item.memoryusage }} Memory</em></li>
            </ul>
        </fieldset>
    `
}

let knackSelect = {
    props: ['list'],
    template: `
        <fieldset id='knacks' class='section'>
            <legend>Knacks</legend>
            <li v-for='knack in list'>
                <label :for='knack.id'>
                    <input type='checkbox' :id='knack.id' :value='knack.display' v-model='$root.chosenKnacks'>
                    {{ knack.display }}
                </label>
            </li>
        </fieldset>
    `
}

let scrInfo = {
    props: ['d'],
    data: function () {
        return {
            selected: this.d[0].list[0],
        }
    },
    methods: {
        updateSelected: function (sel) {
            let [whichList, whichItem] = sel.target.value.split(",")
            this.selected = this.d[whichList].list[whichItem]
        },
        addToLoadout: function () {
            if (this.$root.$data.loadout.indexOf(this.selected) === -1) {
                this.$root.$data.loadout.push(this.selected)
            }
        },
        removeFromLoadout: function () {
            this.$root.$data.loadout = this.$root.$data.loadout.filter(f => f !== this.selected)
        },
        clearLoadout: function () {
            this.$root.resetLoadout()
        }
    },
    template: `
        <fieldset id='info' class='grid-container section'>
            <legend>Script Details</legend>
            <select @change='updateSelected' class='title'>
                <optgroup v-for='item in d' :label='item.group'>
                    <option v-for='sc in item.list' :value="d.indexOf(item)+','+item.list.indexOf(sc)">
                        {{ sc.title }}
                    </option>
                </optgroup>
            </select>
            <button @click='addToLoadout'>Add to Loadout</button>
            <button @click='removeFromLoadout'>Remove from Loadout</button>
            <button @click='clearLoadout' class=title>Clear Loadout</button>
            <div id="title" class="item title">{{ selected.title }} ({{ selected.devpath }})</div>
            <div class="item label">Tier</div></div><div id="tier" class="item datum"> {{ selected.tier }}</div>
            <div class="item label">Developer</div><div id="developer" class="item datum"> {{ selected.developer }}
            </div>
            <div class="item label">Memory Usage</div><div id="memory" class="item datum">{{ selected.memoryusage }}</div>
            <div class="item label">Codin' Required</div><div id="requirements" class="item datum">{{selected.requirements || "Basic"}}</div>
            <div class="item label">Use Case</div><div id="use" class="item datum">{{ selected.usecase }}</div>
            <div class="item label">Cost</div><div id="cost" class="item datum">{{ selected.cost }} </div>
            <div class="item label">Delivery</div><div id="delivery" class="item datum"> {{ selected.delivery }}</div>
            <div class="item label">Mode</div><div id="mode" class="item datum">{{ selected.mode }}</div>
            <div class="item label">Functions</div><div id="functions" class="item datum"> {{ selected.functions }}
            </div>
            <div v-if="selected.tier==6" class="item label">Passive</div><div id="hotsim-passive" v-if="selected.tier==6"
                class="item datum">{{ selected.passive }}</div>
            <div v-if="selected.tier==6" class="item label">Active</div><div id="hotsim-active" v-if="selected.tier==6"
                class="item datum">{{ selected.active }}</div>
            <div v-if="selected.tier==6" class="item label">Once</div><div id="hotsim-once" v-if="selected.tier==6"
                class="item datum">{{ selected.once }}</div>
        </fieldset>
    `
}

let app = new Vue({
    el: '#app',
    data: {
        items: RIPDATA,
        knacks: KNACKS,
        chosenKnacks: [],
        loadout: [
            RIPDATA[0],
            RIPDATA[1],
            RIPDATA[2]
        ],
        scriptList: [
            { group: 'Fundamentals', list: getScriptsOfTier(0) },
            { group: 'Tier 1', list: getScriptsOfTier(1) },
            { group: 'Tier 2', list: getScriptsOfTier(2) },
            { group: 'Tier 3', list: getScriptsOfTier(3) },
            { group: 'Tier 4', list: getScriptsOfTier(4) },
            { group: 'Tier 5', list: getScriptsOfTier(5) },
            { group: 'Tier 6 (HOTSIM)', list: getScriptsOfTier(6) }
        ]
    },
    methods: {
        resetLoadout: function () {
            this.loadout = [
                RIPDATA[0],
                RIPDATA[1],
                RIPDATA[2]
            ]
        }
    },
    components: {
        'scr-info': scrInfo,
        'loadout-display': loadoutDisplay,
        'knack-select': knackSelect
    }
})

