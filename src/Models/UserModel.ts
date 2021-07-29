// User model
class UserModel {
	public userId: number;
	public uuid: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public isAdmin: number;
    public token: string;
    public captcha?: string;
}

export default UserModel;
