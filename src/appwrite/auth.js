import config from "../../config/config";
import { Client, Account, ID } from "appwrite";

class Auth{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.account = new Account(this.client);
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(error.message);
        }
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                await this.login({email,password});
                const user = await this.getCurrentUser();
                return user;
            }
            else{
                throw new console.error("some error");
                
                
            }
            
        } catch (error) {
            throw error;
        }
    } 


     async getCurrentUser() {
        try {
            const result = await this.account.get();
            return result;
            
        } catch (error) {
            console.log(error);
        }

    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new Auth();
export default authService;

