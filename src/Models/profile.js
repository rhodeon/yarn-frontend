// Profile represents the user profile obtained from a response.
export default class Profile {
    constructor({
                    username = "",
                    firstName = "",
                    lastName = "",
                    email = "",
                    avatarURL: avatar = "",
                    status = "",
                    about = "",
                } = {}) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatar = avatar;
        this.status = status;
        this.about = about;
    }
}