class FormValidation{
    constructor(){
        this.data = [];
        this.rejects = [];
    }
    validate(post_data){
        this.data = []; //This empties the property that contains the post data to be validated.
        this.rejects = []; //This empties the property that contains the rejected post data.
        this.data = post_data; //Sets the post data to be validated later on
    }
    run(validations){
        /* Removes spaces and turn to array */
        let converted_string = validations.replaceAll(" ", "");
        converted_string = converted_string.toLowerCase();
        converted_string = converted_string.split(",");
        /* Loops over the converted string to see what are the specified validations */
        for(let i=0; i<converted_string.length; i++){
            if(converted_string[i] == "notnull"){
                this.notNull();
            }else if(converted_string[i] == "nonumber"){
                this.noNumber();
            }
        }
        return this.rejects;
    }
    notNull(){
        let values = Object.entries(this.data);
        for(let value of values){
            if(!value[1]){
                this.rejects.push(`${value[0]} must not be null.`);
            }
        }
    }
    noNumber(){
        let values = Object.entries(this.data);
        for(let value of values){
            for(let i=0; i<value[1].length; i++){
                if(!isNaN(parseFloat(value[1][i])) && isFinite(value[1][i])){
                    this.rejects.push(`${value[0]} must not contain a number`);
                }
            }
        }
    }
}
module.exports = new FormValidation;