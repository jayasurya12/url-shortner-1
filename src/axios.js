import axios from 'axios'

const instance =axios.create({
    baseURL:"https://url-shortner5.herokuapp.com"
})

export default  instance