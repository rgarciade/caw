new Vue({
    el: 'principal',
    mounted() {
        let token = localStorage.getItem('token')
        if (token && token.length > 0) {
            this.loged = true
            this.listAll()
        }
    },
    updated() {
        let token = localStorage.getItem('token')
        if (token && token.length > 0) {
            this.loged = true
        }
    },
    data: {
        loged: false,
        signerror: false,
        created: false,
        createderror: false,
        createNoteErro: false,
        name: '',
        pass: '',
        notes: null,
        listfavs: null,
        titulo: '',
        texto: '',
        newNote: false
    },
    methods: {
        changeNewNoteStatus() {
            this.newNote = (this.newNote) ? false : true
        },
        addNote() {
            var self = this;
            this.newNote = false
            axios.post('./api/notes/addNote', {
                    title: this.titulo,
                    text: this.texto
                }, { headers: { 'Content-Type': 'application/json', authorization: localStorage.getItem('token') } })
                .then((response) => {

                    swal('',
                        'nota agregada',
                        'success'
                    )
                    self.titulo = ''
                    self.texto = ''
                    self.listAll()
                })
                .catch((error) => {
                    swal('',
                        'error al añadir nota',
                        'error'
                    )
                    self.titulo = ''
                    self.texto = ''
                    self.listAll()

                });
        },
        SignIn() {
            var self = this;
            axios.post('./api/user/loging', {
                        name: this.name,
                        password: this.pass,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }

                ).then((response) => {

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    self.listAll()
                    self.signerror = false
                    self.loged = true
                })
                .catch((error) => {

                    swal('',
                        'error al loguearse',
                        'error'
                    )

                    self.signerror = true
                    self.loged = false
                });
        },
        Signup() {
            var self = this;
            axios.post('./api/user/register', {
                        name: this.name,
                        password: this.pass,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }

                ).then((response) => {

                    self.created = true
                    self.createderror = false
                    swal('',
                        'usuario creado, logueate',
                        'success'
                    )
                })
                .catch((error) => {

                    swal('',
                        'error al crear usuario',
                        'error'
                    )
                    self.createderror = true
                });
        },
        addFav(NoteId) {

            var self = this;
            axios.post('./api/notes/addFav', {
                    NoteId: NoteId
                }, { headers: { 'Content-Type': 'application/json', authorization: localStorage.getItem('token') } })
                .then((response) => {

                    swal('',
                        'favorito añadido',
                        'success'
                    )
                })
                .catch((error) => {

                    swal('',
                        'error al añadir favorito',
                        'error'
                    )
                });
        },
        listAll() {
            var self = this;
            axios.get('./api/notes/ListAll', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', authorization: localStorage.getItem('token') }
                }).then((response) => {

                    self.notes = response.data
                })
                .catch((error) => {
                    swal('',
                        'error al listar notas',
                        'error'
                    )

                });
        },
        listAllStarts() {
            var self = this;
            axios.get('./api/user/ListAllfavoritesNotes', {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', authorization: localStorage.getItem('token') }
                }).then((response) => {

                    self.listfavs = response.data
                })
                .catch((error) => {
                    swal('',
                        'error al listar favoritos',
                        'error'
                    )

                });
        },
        clearAll() {
            this.notes = null
        },
        clearAllStarts() {
            this.listfavs = null
        },
        logout() {
            localStorage.setItem('token', '')
            this.listfavs = null
            this.created = false
            this.loged = false
        }
    }
})