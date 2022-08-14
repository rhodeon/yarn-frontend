// FriendshipRequest represents the model of a friend request response.
export default class FriendshipRequest {
    constructor({
                    id = 0,
                    user = {}
                } = {}) {
        this.id = id;
        this.user = new FriendshipUser(user)
    }
}

// FriendshipUser represents the user profile obtained from a friend request.
class FriendshipUser {
    constructor({
                    username = "",
                    firstName = "",
                    lastName = "",
                    avatarURL: avatar = "",
                    status = "",
                } = {}) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.status = status;
    }
}