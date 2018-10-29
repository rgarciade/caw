new Vue({
    el: 'principal',
    mounted() {
        let token = localStorage.getItem('token')
        console.log(token)
        if (token) this.loged = true
    },
    data: {
        loged: false,
        signerror: false,
        created: false,
        name: '',
        pass: ''
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
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
})