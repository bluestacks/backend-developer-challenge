const axios = require('axios')
const Qs = require('qs')

const MS_IN_SEC = 1000
class API{
  constructor({url, timeout=10}){
    if(this.constructor === API){
      // this is an abstract class
      throw new Error("Abstract classes can't be instantiated.")
    }

    this.instance =  axios.create({
      baseURL: url,
      timeout: timeout*MS_IN_SEC,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    })
  }
  // get call
  async get (uri, params){
    return await this.instance.get(uri, {params})
  }

  // delete call
  async delete (uri, params){
    return await this.instance.delete(uri, {params})
  }

  // head call
  async head (uri, params){
    return await this.instance.head(uri, {params})
  }

  // options call
  async option (uri, params){
    return await this.instance.options(uri, {params})
  }

  // post call
  async post (uri, data, config){
    return await this.instance.post(uri, data, config)
  }

  // put call
  async put (uri, data, config){
    return await this.instance.put(uri, data, config)
  }

  // patch call
  async patch (uri, data, config){
    return await this.instance.patch(uri, data, config)
  }

}

module.exports = API