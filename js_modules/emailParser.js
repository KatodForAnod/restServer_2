function isCorrect(email)
{
    return email.split("@").length == 2;
}

class EmailParser{
    constructor( email )
    {
        this.email = email;

        Object.defineProperty(this, 'name', {
            get(){
                if( isCorrect(email) ){
                    return this.email.split("@")[0];
                }else{
                    return null;
                }
                
            }
        })

        Object.defineProperty(this, 'domain', {
            get(){
                if( isCorrect(email) ){
                    return this.email.split("@")[1];
                }else{
                    return null;
                }
            }
        })

        Object.defineProperty(this, 'isCorrect', {
            get(){
                return isCorrect(this.email);
            }
        })
    }
}

export default EmailParser;