<template>
    <div>
        <portal to="title">
            <app-title icon="user-shield">Roles</app-title>
        </portal>

        <portal to="actions">
            <router-link :to="{ name: 'roles.create' }" class="button">Create Role</router-link>
        </portal>

        <div class="row">
            <div class="content-container">
                <p-datatable :endpoint="endpoint" name="roles" sort-by="name" :per-page="10" key="roles_table">
                    <template slot="name" slot-scope="table">
                        <router-link :to="{ name: 'roles.edit', params: {role: table.record.id} }">{{ table.record.name }}</router-link>
                    </template>
                    
                    <template slot="slug" slot-scope="table">
                        <code>{{ table.record.slug }}</code>
                    </template>

                    <template slot="description" slot-scope="table">
                        <span class="text-gray-800 text-sm">{{ table.record.description }}</span>
                    </template>

                    <template slot="actions" slot-scope="table">
                        <p-dropdown right>
                            <fa-icon :icon="['fas', 'bars']"></fa-icon>
                            
                            <template slot="options">
                                <p-dropdown-item @click.prevent :to="{ name: 'roles.edit', params: {role: table.record.id} }">Edit</p-dropdown-item>

                                <!--
                                    We don't want to delete core roles, so let's
                                    check for that and save ourselves a headache.
                                -->

                                <p-dropdown-item
                                    v-if="! isProtected(table.record.slug)" 
                                    @click.prevent
                                    v-modal:delete-role="table.record"
                                >
                                    Delete
                                </p-dropdown-item>
                            </template>
                        </p-dropdown>
                    </template>
                </p-datatable>
            </div>
        </div>

        <portal to="modals">
            <p-modal name="delete-role" title="Delete Role">
                <p>Are you sure you want to permenantly delete this role?</p>

                <template slot="footer" slot-scope="role">
                    <p-button v-modal:delete-role @click="destroy(role.data.id)" theme="danger" class="ml-3">Delete</p-button>
                    <p-button v-modal:delete-role>Cancel</p-button>
                </template>
            </p-modal>
        </portal>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        head: {
            title() {
                return {
                    inner: 'Roles'
                }
            }
        },

        data() {
            return {
                endpoint: '/datatable/roles',
            }
        },

        methods: {
            isProtected(slug) {
                let roles = ['admin', 'user', 'guest']

                return _.includes(roles, slug);
            },

            destroy(id) {
                axios.delete('/api/roles/' + id).then((response) => {
                    toast('Role successfully deleted.', 'success')

                    proton().$emit('refresh-datatable-roles')
                })
            }
        }
    }
</script>
