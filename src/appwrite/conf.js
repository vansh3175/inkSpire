import config from "../../config/config";
import { Client, Account, ID,Databases,Storage,Query} from "appwrite";

class Service{
    client = new Client();
    account;
    bucket;
    databases;
    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.account = new Account(this.client);
        this.bucket=new Storage(this.client);
        this.databases = new Databases(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId

            })
        } catch (error) {
            throw error;
            return false;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            const res = await this.databases.updateDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            return res;
            
        } catch (error) {
            throw error;
            return false;

        }
    }

    async deletePost(slug){
        try {
            const res = await this.databases.deleteDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug);
            return res;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug);
            
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(){
        try {
             const queries=[
                    Query.equal("status","active"),
                ]
            return await this.databases.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId,
               queries
            )
            
        } catch (error) {
            throw error;
            return false;
        }
    }

    async fileUpload(file){
        try {
            const res = await this.bucket.createFile(config.appWriteBucketId,ID.unique(),file);
            return res;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appWriteBucketId,fileId);
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    filePreview(fileId){
        try {
            return this.bucket.getFilePreview(config.appWriteBucketId,fileId);
        } catch (error) {
            throw error;
        }
    }

    async getFile(fileId){
        try {
            const res = await this.bucket.getFileView(config.appWriteBucketId,fileId);
            return res;
        } catch (error) {
            throw error;
        }
    }


    
}

const service = new Service();
export default service;


