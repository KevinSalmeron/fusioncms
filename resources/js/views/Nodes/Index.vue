<template>
    <div>
        <portal to="title">
            <app-title icon="anchor">{{ menu.name }}</app-title>
        </portal>

        <portal to="actions">
            <div class="inline-block">
                <router-link :to="{ name: 'menus' }" class="button mr-3">Go back</router-link>
                <p-button theme="primary" @click.prevent="save" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</p-button>
            </div>
        </portal>

        <div class="row">
            <div class="side-container">
                <p-card>
                    <h3>Custom URL</h3>

                    <div>
                        <p-input name="name" label="Name" v-model="form.name"></p-input>

                        <p-input name="url" label="URL" v-model="form.url"></p-input>

                        <p-select
                            name="new_window"
                            label="Open link where"
                            help="Determine where the link should open."
                            :options="[
                                {
                                    'label': 'New Window',
                                    'value': 1,
                                },
                                {
                                    'label': 'Same Window',
                                    'value': 0,
                                },
                            ]"
                            v-model="form.new_window">
                        </p-select>

                        <p-button theme="primary" @click.prevent="add('custom')">Add</p-button>
                    </div>
                </p-card>
            </div>

            <div class="content-container">
                <p-card no-body>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>

                        <p-sortable-list v-model="nodes" class="sortable-list">
                            <tbody>
                                <p-sortable-item v-for="node in nodes" :key="node.id">
                                    <tr>
                                        <td class="w-8">
                                            <p-sortable-handle class="mr-6 text-gray-400">
                                                <div class="w-6 h-6 flex items-center justify-center">
                                                    <fa-icon :icon="['fas', 'grip-vertical']" class="fa-fw"></fa-icon>
                                                </div>
                                            </p-sortable-handle>
                                        </td>

                                        <td>
                                            <fa-icon class="fa-fw text-xs mr-1" :class="{'text-success-500': node.status, 'text-danger-500': ! node.status}" :icon="['fas', 'circle']"></fa-icon>
                                            <router-link :to="{ name: 'menu.nodes.edit', params: {menu: menu.id, node: node.id} }">{{ node.name }}</router-link>
                                            <fa-icon v-if="node.new_window" class="fa-fw text-gray-500 text-xs" :icon="['fas', 'external-link-alt']"></fa-icon>
                                        </td>

                                        <td>
                                            <span class="text-sm text-gray-600">
                                                {{ node.url }}
                                            </span>
                                        </td>

                                        <td><span class="text-xs px-2 py-1 bg-gray-200 text-gray-600 leading-none">custom</span></td>

                                        <td>
                                            <div style="min-width: 50px;" class="text-right draggable__actions">
                                                <p-dropdown right>
                                                    <fa-icon :icon="['fas', 'bars']"></fa-icon>

                                                    <template slot="options">
                                                        <p-dropdown-item @click.prevent :to="{ name: 'menu.nodes.edit', params: {menu: menu.id, node: node.id} }">Edit</p-dropdown-item>
                                                        <!-- <p-dropdown-item>Assign parent...</p-dropdown-item> -->

                                                        <p-dropdown-item
                                                            @click.prevent
                                                            v-modal:move-before="node"
                                                        >
                                                            Move before...
                                                        </p-dropdown-item>

                                                        <p-dropdown-item
                                                            @click.prevent
                                                            v-modal:move-after="node"
                                                        >
                                                            Move after...
                                                        </p-dropdown-item>

                                                        <p-dropdown-item
                                                            @click.prevent
                                                            v-modal:delete-node="node"
                                                        >
                                                            Delete
                                                        </p-dropdown-item>
                                                    </template>
                                                </p-dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                </p-sortable-item>
                            </tbody>
                        </p-sortable-list>
                    </table>
                </p-card>
            </div>
        </div>

        <portal to="modals">
            <p-modal name="delete-node" title="Delete Node" key="delete_node">
                <p>Are you sure you want to permenantly delete this node?</p>

                <template slot="footer" slot-scope="node">
                    <p-button v-modal:delete-node @click="destroy(node.data.id)" theme="danger" class="ml-3">Delete</p-button>
                    <p-button v-modal:delete-node>Cancel</p-button>
                </template>
            </p-modal>

            <p-modal name="move-before" title="Move before..." key="move_before">
                <template>
                    <p>Which node would you like to move before?</p>

                    <p-select name="before" label="Node" :options="options" v-model="before"></p-select>
                </template>

                <template slot="footer" slot-scope="node">
                    <p-button v-modal:move-before @click="moveBefore(node.data.id)" theme="danger" class="ml-3">Move</p-button>
                    <p-button v-modal:move-after @click="before = null">Cancel</p-button>
                </template>
            </p-modal>

            <p-modal name="move-after" title="Move after..." key="move_after">
                <template>
                    <p>Which node would you like to move after?</p>

                    <p-select name="after" label="Node" :options="options" v-model="after"></p-select>
                </template>

                <template slot="footer" slot-scope="node">
                    <p-button v-modal:move-after @click="moveAfter(node.data.id)" theme="danger" class="ml-3">Move</p-button>
                    <p-button v-modal:move-after @click="after = null">Cancel</p-button>
                </template>
            </p-modal>
        </portal>
    </div>
</template>

<script>
    import Form from '../../forms/Form'

    export default {
        head: {
            title() {
                return {
                    inner: this.menu.name || 'Loading...'
                }
            }
        },

        data() {
            return {
                menu: {},
                nodes: [],
                saving: false,
                before: null,
                after: null,
                form: new Form({
                    name: '',
                    url: '',
                    new_window: 0,
                }),
            }
        },

        computed: {
            options() {
                return _.map(this.nodes, function(node) {
                    return {
                        'label': node.name,
                        'value': node.id
                    }
                })
            }
        },

        methods: {
            add(type) {
                this.saving = true

                this.form.post('/api/menus/' + this.menu.id + '/nodes').then((response) => {
                    this.fetchNodes().then((response) => {
                        this.reset()
                        this.saving = false

                        toast('Menu node successfully added', 'success')
                    })
                }).catch((response) => {
                    toast(response.message, 'failed')
                })
            },

            save() {
                this.saving = true
                let nodes = {}

                _.each(this.nodes, (node, index) => {
                    nodes[node.id] = {
                        order: index + 1
                    }
                })

                axios.post('/api/menus/' + this.menu.id + '/reorder', {nodes: nodes}).then((response) => {
                    this.saving = false
                    toast('Menu nodes successfully reordered.', 'success')
                })
            },

            fetchNodes() {
                return axios.get('/api/menus/' + this.menu.id).then((response) => {
                    this.nodes = response.data.data.nodes
                })
            },

            reset() {
                this.form.name = ''
                this.form.url  = ''
                this.form.new_window = 0
            },

            destroy(id) {
                axios.delete('/api/menus/' + this.menu.id + '/nodes/' + id).then((response) => {
                    this.fetchNodes().then(() => {
                        toast('Menu node successfully deleted.', 'success')
                    })
                })
            },

            moveBefore(move) {
                axios.post('/api/menus/' + this.menu.id + '/nodes/move/before', {
                    move: move,
                    before: this.before,
                }).then((response) => {
                    this.fetchNodes().then(() => {
                        this.before = null

                        toast('Menu node successfully moved.', 'success')
                    })
                })
            },

            moveAfter(move) {
                axios.post('/api/menus/' + this.menu.id + '/nodes/move/after', {
                    move: move,
                    after: this.after,
                }).then((response) => {
                    this.fetchNodes().then(() => {
                        this.after = null

                        toast('Menu node successfully moved.', 'success')
                    })
                })
            }
        },

        beforeRouteEnter(to, from, next) {
            axios.get('/api/menus/' + to.params.menu).then((response) => {
                next(function(vm) {
                    vm.menu = response.data.data
                    vm.nodes = response.data.data.nodes

                    vm.$emit('updateHead')
                })
            })
        },

        beforeRouteUpdate(to, from, next) {
            axios.get('/api/menus/' + to.params.menu).then((response) => {
                this.menu = response.data.data
                this.nodes = response.data.data.nodes

                this.$emit('updateHead')
            })

            next()
        },
    }
</script>