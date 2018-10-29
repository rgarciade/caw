new Vue({
    el: 'principal',
    mounted() {
        let token = localStorage.getItem('token')
        console.log(token)
        if (token && token.length > 0) this.loged = true
    },
    data: {
        loged: false,
        signerror: false,
        created: false,
        createderror: false,
        name: '',
        pass: '',
        notes: null
    },
    methods: {
        SignIn() {
            var self = this;
            axios.post('http://localhost:3800/api/user/loging', {
                        name: this.name,
                        password: this.pass,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }

                ).then((response) => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    self.signerror = false
                    self.loged = true
                })
                .catch((error) => {
                    console.log(error);
                    self.signerror = true
                    self.loged = false
                });
        },
        Signup() {
            var self = this;
            axios.post('http://localhost:3800/api/user/register', {
                        name: this.name,
                        password: this.pass,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }

                ).then((response) => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    self.created = true
                    self.createderror = false
                })
                .catch((error) => {
                    console.log(error);
                    self.createderror = true
                });
        },
        listAll() {
            var self = this;
            axios.get('http://localhost:3800/api/notes/ListAll', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', authorization: localStorage.getItem('token') }
                }).then((response) => {
                    console.log(response.data);
                    self.notes = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        clearAll() {
            this.notes = null
        },
        logout() {
            localStorage.setItem('token', '')
            this.created = false
            this.loged = false
        }
    }
})