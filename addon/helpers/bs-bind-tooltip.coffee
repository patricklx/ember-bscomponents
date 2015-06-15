`import {getInstance} from '../services/tooltip-box-manager'`

helperFunction = (params, hash, options, env) ->
    newHash = {}
    for k,v of hash
      if v.isStream
        newHash[k + "Binding"] = v
      else
        newHash[k] = v
    hash = Ember.Object.create(newHash)

    id = getInstance().registerTip("tooltip", hash, options, env)
    env.dom.setAttribute(options.element, getInstance().attribute, id)
    return


`export default helperFunction`
