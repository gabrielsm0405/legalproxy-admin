export default{
    analyse_error(error){
        var error_string
        
        if (error.response) {
            // Request made and server responded
            error_string = ''
            Object.keys(error.response.data).forEach(error_message_id => {
                if(typeof error.response.data[error_message_id] == 'string'){
                    error_string = error.response.data[error_message_id].charAt(0).toUpperCase() + error.response.data[error_message_id].slice(1)
                }
                else{
                    error.response.data[error_message_id].forEach(error_message => {
                        error_string += error_message.charAt(0).toUpperCase() + error_message.slice(1)
                    })
                }
                
                error_string += ' '
            })
        } else if (error.request) {
            // The request was made but no response was received
            error_string = error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            error_string = 'Error ' + error.message
        }
    
        return error_string
    }
}