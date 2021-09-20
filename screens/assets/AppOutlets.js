import { getNewOutlet } from 'reconnect.js'; 

getNewOutlet('androidPrompt', {
    visible: false,
    message: '', 
}, { autoDelete: false})

getNewOutlet('tag', {
    data: ''
}, { autoDelete: false})

getNewOutlet('writeTagOptions', {
    type: '', 
    textInputValue: '', 
}, { autoDelete: false })