import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) // Your API Endpoint
        .setProject(config.appwriteProjectId); // Your project ID
        this.account = new Account(this.client)
    }

    async createAccount({name,email,password}){
        try {
            const userAccount = await this.account.create(ID.unique(),name,email,password);
            if(userAccount){
                // method call
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, login}) {
        try {
            return await  this.account.createEmailPasswordSession({
                email,
                password
            })
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSession();
        } catch (error) {
            throw error 
        }
    }
}

const authService = new AuthService();

export default authService ;