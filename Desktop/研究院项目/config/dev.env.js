'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
 // BASE_API: '"http://localhost:7007/ccb/v1"'
   BASE_API: '"http://test.daoheit.com/general/v1"',
   BASE_API_SURVEY:'"http://test.daoheit.com/survey/v1"'
})
