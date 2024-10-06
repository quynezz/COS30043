const app = Vue.createApp({});

app.component('app-mypost', {
    data: function() {
        return {
            statPosts: [],
            strStatus: '',
            selectedIndex: -1
        };
    },
    template: `
        <div>
            <p>
                <b>Status:</b>&nbsp;<input v-model="strStatus" />&nbsp;
                <button v-on:click="add(strStatus)">Post</button>
            </p>
            <p v-for="(status, index) in statPosts" :key="index" 
               :class="{ selected: selectedIndex === index }" 
               @click="select(index)">
                {{ status }}
                <button v-on:click="remove(index)">Delete</button>
            </p>
        </div>
    `,
    methods: {
        add: function(status) {
            if (status.trim()) {
                this.statPosts.push(status);
                this.strStatus = '';
                this.selectedIndex = -1;
            }
        },
        remove: function(index) {
            this.statPosts.splice(index, 1);
            if (this.selectedIndex === index) {
                this.selectedIndex = -1;
            }
        },
        select: function(index) {
            this.selectedIndex = index;
        }
    }
});

app.mount('#app');
