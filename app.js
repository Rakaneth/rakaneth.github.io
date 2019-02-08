
let loadoutDisplay = {
    props: ['loadout'],
    data: function () {
        return {
            hackLevel: 1
        }
    },
    methods: {
        getTotalMemory(loadout) {
            return loadout.reduce((total, nxt) => total + nxt.memoryusage, 0)
        },
        getBlockSize(loadout) {
            return Math.ceil(this.getTotalMemory(loadout) / 4)
        },
        getMaxBlox() {
            return Math.ceil(this.hackLevel / 2)
        }
    },
    computed: {
        classObj: function () {
            return {
                memerror: this.getBlockSize(this.loadout) > this.getMaxBlox()
            }
        }
    },
    template: `
        <fieldset id='loadout' class='section'>
            <legend>Current Loadout</legend>
            <div>
                <label for='hacklevel'>
                    Hackin'    
                    <select v-model='hackLevel'>
                        <optgroup label='Basic'>
                            <option :value=1>1</option>
                            <option :value=2>2</option>
                        </optgroup>
                        <optgroup label='Intermediate'>
                            <option :value=3>3</option>
                            <option :value=4>4</option>
                        </optgroup>
                        <optgroup label='Advanced'>
                            <option :value=5>5</option>
                            <option :value=6>6</option>
                        </optgroup>
                        <optgroup label='Larger Than Life'>
                            <option :value=7>7</option>
                        </optgroup>
                    </select>
                </label>
            </div>
            <fieldset id='loadout-list'>
                <legend>Loadout</legend>
                <ul>
                    <li v-for='item in loadout'>
                        {{ item.title }}
                        <ul>
                            <li><em>Memory Usage: {{ item.memoryusage }}</em></li>
                            <li><em> Use Case: {{ item.usecase }}</em></li>
                        </ul>
                    </li>
                </ul>
            </fieldset>
            <div id='loadout-summary' class='grid-container'>
                <div class='label'>Total Memory Used</div> <div>{{ getTotalMemory(loadout) }}</div>
                <div class='label'>Size in Blocks</div> <div :class='classObj'>{{ getBlockSize(loadout) }}</div>
                <div class='label'>Total Number of Blocks for Loadouts</div><div>{{ hackLevel }}</div>
                <div class='label'>Maximum Size of Any Single Loadout</div><div>{{ getMaxBlox() }}</div>
            </div>
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
        },
    },
    components: {
        'scr-info': scrInfo,
        'loadout-display': loadoutDisplay,
        'knack-select': knackSelect
    }
})

