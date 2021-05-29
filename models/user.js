const Model = require('./Model');
class User extends Model{
    constructor(){
        super();
    }
    async login_process(post_data){
        let doesExist = await this.getDataByEmail(post_data.email);
        if(doesExist){
            if(doesExist.password == post_data.password){
                return Promise.resolve(doesExist);
            }
        }else{
            return Promise.resolve(false);
        }
    }
    async registration(post_data){
        try{

            let client = this.client;
            let result = await this.getDataByEmail(post_data.email);
            // console.log(result);
            if(false){
            // if(result){
                console.log("Duplicate Email");
            }else{
                /** 
                 * Trying callback just to taste a little bit of hell (wink)
                 * Adding new data to db
                 **/
                client.get('user_id', function(err, user_id){
                    client.incr('user_id', function(err, data){
                        if(data){
                            let arr = [
                                `id`, `${user_id}`,
                                `first_name`, `${post_data.first_name}`,
                                `last_name`, `${post_data.last_name}`,
                                `password`, `${post_data.password}`,
                            ];
                            client.hmset(`email:${post_data.email}`, arr, function(err, msg){
                                console.log(msg, "Successfully Added to Database");
                            });
                        }else{
                            console.log("Something went wrong!");
                        }
                    });
                });
            }
            
            return true;
        }catch(err){
            console.log("Error: Duplicate Email");
        }
        return false;
    }
    getDataByEmail(email){
        return new Promise((resolve, reject)=>{
            let client = this.client;
            client.hgetall(`email:${email}`, function(err, data){
                if(data){
                    return resolve(data);
                }else{
                    return resolve(false);
                }
            });
        });
    }
}
module.exports = new User;