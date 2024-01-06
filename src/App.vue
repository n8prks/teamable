<template>
    <div v-show="!isEditMode" >
                <h1>User Profile</h1>
                <img id="puppypic" :src="img1">
                <span>Name: </span><b id="name"> {{ name }}</b>
                <hr />
                <span>Email: </span><b id="email"> {{ email }}</b>
                <hr />
                <span>Interests: </span><b id="interests"> {{ interests }}</b>
                <hr />
                <button @click="handleEditProfile">Edit Profile</button>
            </div>
            <div v-show="isEditMode" >
                <h1>User Profile</h1>
                <img id="puppypic" :src="img1">
                <span>Name: </span>
                    <input id="input-name" type="text" v-model="name" />
                <hr />
                <span>Email: </span>
                <input id="input-email" type="text" v-model="email" />
                <hr />
                <span>Interests: </span>
                    <input id="input-interests" type="text" v-model="interests" />
                <hr />
                <button @click="handleUpdateProfile">Update Profile</button>
            </div>
</template>
<script>
    import image1 from "./cute-labrador-puppy.jpg"
    export default {
        name: "App",
        data() {
            return {
                img1: image1,
                name: "",
                email: "",
                interests: "",
                isEditMode: false,
            }
        },
        async created(){
            const userData = await this.fetchUserProfile()
            this.name = userData.name
            this.email = userData.email
            this.interests = userData.interests
        },
        methods: {
            handleEditProfile(){
                this.isEditMode = true            },
                            //6.8 34:19
            async handleUpdateProfile(){
                const payload = {
                    name: this.name,
                    email: this.email,
                    interests: this.interests
                }
                const resJson = await this.updateUserProfile(payload)

                console.log(resJson)

                this.isEditMode = false
            },
            async fetchUserProfile() {
                const res = await fetch('get-profile')
                return await res.json()
            },

            async updateUserProfile(payload) {
                const res = await fetch('update-profile', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                return await res.json()
            }

        }
}

</script>

<style>

#puppypic{
    width: 320px;
    display: block;
    margin-bottom: 30px;
}

div {
    margin: 40px auto;
    width: 80%;
}

hr {
    width: 400px;
    margin-left: 0;
    margin-top: 30px;
    margin-bottom: 30px;


}
button {
    width: 160px;
    font-size: 15px;
    height: 45px;
    border-radius: 10px;
}
#edit-view input{
    width: 200px;
    padding: 10px;
    font-size: 15px;

}

button:hover{
    cursor: pointer;
}

</style>
