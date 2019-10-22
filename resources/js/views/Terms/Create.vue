<template>
    <div>
        <portal to="title">
            <app-title :icon="taxonomy.icon">Create {{ singular }}</app-title>
        </portal>
        
        <portal to="subtitle">{{ taxonomy.description }}</portal>

        <div class="row">
            <div class="content-container">
                <form @submit.prevent="submit">
                    <p-card>
                        <div class="row">
                                <div class="col form-sidebar">
                                    <div class="xxl:mr-10">
                                        <!--  -->
                                    </div>
                                </div>

                                <div class="col mb-6 form-content">
                                    <div class="row">
                                        <div class="col w-1/2">
                                            <p-input name="name" label="Name" v-model="form.name"></p-input>
                                        </div>

                                        <div class="col w-1/2">
                                            <p-slug name="slug" label="Slug" monospaced v-model="form.slug" :watch="form.name"></p-slug>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        <div v-if="sections.body.length > 0">
                            <!-- Loop through each section -->
                            <div v-for="(section, index) in sections.body" :key="section.handle">
                                <div class="row">
                                    <div class="col form-sidebar">
                                        <div class="xxl:mr-10">
                                            <h3>{{ section.name }}</h3>
                                            <p class="text-sm">{{ section.description }}</p>
                                        </div>
                                    </div>

                                    <div class="col form-content">
                                        <!-- Loop through each section field -->
                                        <div v-for="field in section.fields" :key="field.handle" class="form__group">
                                            <component
                                                :is="field.type.id + '-fieldtype'"
                                                :field="field"
                                                v-model="form[field.handle]"
                                            >
                                            </component>
                                        </div>
                                    </div>
                                </div>
                            
                                <hr v-if="index !== sections.body.length - 1">
                            </div>
                        </div>

                        <div v-else class="text-center">
                            <p>You should configure your Taxonomy with some sections and fields first <fa-icon class="text-emoji" :icon="['fas', 'hand-peace']"></fa-icon></p>

                            <router-link class="button items-center" :to="'/taxonomies/manage/' + taxonomy.id"><fa-icon :icon="['fas', 'atom-alt']" class="mr-2 text-sm"></fa-icon> Manage your taxonomy</router-link>
                        </div>

                    </p-card>

                    
                </form>
            </div>

            <div class="side-container">
                <form @submit.prevent="submit">
                    <p-card>
                        <div class="row">
                            <div class="col w-full">
                                <p-select
                                    name="status"
                                    label="Status"
                                    :options="[
                                        {
                                            'label': 'Enabled',
                                            'value': 1,
                                        },
                                        {
                                            'label': 'Disabled',
                                            'value': 0,
                                        },
                                    ]"
                                    v-model="form.status"
                                    >
                                </p-select>
                            </div>
                        </div>

                        <portal to="actions" v-if="taxonomy.slug">
                            <router-link :to="{ name: 'taxonomies', params: {taxonomy: taxonomy.slug} }" class="button mr-3">Go Back</router-link>

                            <button type="submit" @click.prevent="submit" class="button button--primary">Save</button>
                        </portal>
                    </p-card>

                    <p-card v-for="(section) in sections.sidebar" :key="section.handle" class="mt-6">
                        <h3>{{ section.name }}</h3>
                        <p class="text-sm">{{ section.description }}</p>

                        <div class="w-full">
                            <!-- Loop through each section field -->
                            <div v-for="field in section.fields" :key="field.handle" class="form__group">
                                <component
                                    :is="field.type.id + '-fieldtype'"
                                    :field="field"
                                    v-model="form[field.handle]"
                                >
                                </component>
                            </div>
                        </div>
                    </p-card>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import pluralize from 'pluralize'
    import Form from '../../forms/Form'

    export default {
        data() {
            return {
                taxonomy: {},
                form: {},
            }
        },

        computed: {
            sections() {
                let body = []
                let sidebar = []

                if (this.taxonomy.fieldset) {
                    body = _.filter(this.taxonomy.fieldset.sections, function(section) {
                        return section.placement == 'body'
                    })

                    sidebar = _.filter(this.taxonomy.fieldset.sections, function(section) {
                        return section.placement == 'sidebar'
                    })
                }

                return {
                    body: body,
                    sidebar: sidebar
                }
            },

            singular() {
                if (this.taxonomy.name) {
                    return pluralize.singular(this.taxonomy.name)
                }

                return ''
            },
        },

        methods: {
            submit() {
                this.form.post('/api/taxonomies/' + this.taxonomy.slug).then((response) => {
                    toast('Entry saved successfully', 'success')

                    this.$router.push('/taxonomies/' + this.taxonomy.slug + '/edit/' + response.data.id)
                }).catch((response) => {
                    toast(response.response.data.message, 'failed')
                })
            },
        },

        beforeRouteEnter(to, from, next) {
            axios.get('/api/taxonomies/slug/' + to.params.taxonomy).then((response) => {
                next(function(vm) {
                    vm.taxonomy = response.data.data

                    let fields = {
                        name: '',
                        slug: '',
                        status: 1,
                    }

                    _.forEach(vm.taxonomy.fields, function(value, handle) {
                        Vue.set(fields, handle, vm.taxonomy[handle])
                    })

                    vm.form = new Form(fields)
                })
            })
        },
    }
</script>