/*! cnn-video-loader 1.4.5 2015-11-12 */
if(CNNVIDEOAPI.AnalyticsFactory={getAnalyticsFronContext:function(publisher,contexts,type){var context=contexts[type];return context&&context.analytics||(context=contexts["default"]),this.getAnalytics(publisher,context.analytics)},getAnalytics:function(publisher,analyticsConfig){if(!analyticsConfig||"string"==typeof analyticsConfig)return"string"==typeof analyticsConfig&&"none"===analyticsConfig?[]:[this.createHandler(publisher,analyticsConfig)];var retVals=[];for(var analyticsName in analyticsConfig){var configInst=analyticsConfig[analyticsName],instVal=this.createHandler(publisher,analyticsName,configInst);instVal&&retVals.push(instVal)}return retVals},createHandler:function(publisher,type,analyticsConfig){var retVal;switch(type){case"jsmdJumbotron":retVal=new CNNVIDEOAPI.JSMDJumbotronTrackingEventHandler(publisher,publisher,publisher.videoConfig,analyticsConfig);break;case"jsmd":retVal=new CNNVIDEOAPI.JSMDAnalyticsEventHandler(publisher,publisher,publisher.videoConfig,analyticsConfig);break;case"jsmdNewAPI":retVal=new CNNVIDEOAPI.JSMDNewAPIVideoTrackingEventHandler(publisher,publisher,publisher.videoConfig,analyticsConfig);break;case"jsmdVANAPI":retVal=new CNNVIDEOAPI.JSMDVANAPIVideoTrackingEventHandler(publisher,publisher,publisher.videoConfig,analyticsConfig);break;case"jsmdTVEAPI":retVal=new CNNVIDEOAPI.JSMDTVEAPIVideoTrackingEventHandler(publisher,publisher,publisher.videoConfig,analyticsConfig);break;case"jsmdCNNgoFreePreview":retVal=new CNNVIDEOAPI.JSMDCNNgoFreePreviewTrackingEventHandler(publisher,publisher,publisher.videoConfig,analyticsConfig)}return retVal}},String.prototype.replaceAll=function(find,replace){var str=this;return str.replace(RegExp(find,"g"),replace)},Array.prototype.indexOf||(Array.prototype.indexOf=function(searchElement){"use strict";if(null==this)throw new TypeError;var n,k,t=Object(this),len=t.length>>>0;if(0===len)return-1;if(n=0,arguments.length>1&&(n=Number(arguments[1]),n!=n?n=0:0!==n&&1/0!=n&&n!==-1/0&&(n=(n>0||-1)*Math.floor(Math.abs(n)))),n>=len)return-1;for(k=n>=0?n:Math.max(len-Math.abs(n),0);len>k;k++)if(k in t&&t[k]===searchElement)return k;return-1}),"function"!=typeof Array.isArray&&(Array.isArray=function(arr){return"[object Array]"===Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(){var hasOwnProperty=Object.prototype.hasOwnProperty,hasDontEnumBug=!{toString:null}.propertyIsEnumerable("toString"),dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],dontEnumsLength=dontEnums.length;return function(obj){if("object"!=typeof obj&&"function"!=typeof obj||null===obj)throw new TypeError("Object.keys called on non-object");var result=[];for(var prop in obj)hasOwnProperty.call(obj,prop)&&result.push(prop);if(hasDontEnumBug)for(var i=0;dontEnumsLength>i;i++)hasOwnProperty.call(obj,dontEnums[i])&&result.push(dontEnums[i]);return result}}()),"bind"in Function.prototype||(Function.prototype.bind=function(owner){var that=this;if(1>=arguments.length)return function(){return that.apply(owner,arguments)};var args=Array.prototype.slice.call(arguments,1);return function(){return that.apply(owner,0===arguments.length?args:args.concat(Array.prototype.slice.call(arguments)))}}),"forEach"in Array.prototype||(Array.prototype.forEach=function(action,that){for(var i=0,n=this.length;n>i;i++)i in this&&action.call(that,this[i],i,this)}),Function.prototype.bind){var logMethods=["log","debug","info","warn","error","fatal"],windowMethods=["logMsg","debugMsg","infoMsg","warnMsg","errorMsg","fatalMsg"];logMethods.forEach(function(method,index){window[windowMethods[index]]=function(){"object"!=typeof log&&"function"!=typeof log||void 0===log[method]?("error"===method||"warn"===method)&&console&&console[method]&&console[method].apply&&console[method].apply(console,arguments):log[method].apply(log,arguments)}},Function.prototype.bind)}CNNVIDEOAPI.Bootstrapper=function(mappingFile){this.mappingFileURL=mappingFile,this.color="",this.apiMapping={},this.utils=CNNVIDEOAPI.Utils,this.depMgr=CNNVIDEOAPI.DependencyManager,__construct=function(){}(this),this.initialize=function(){this.loadMapping()},this.cnn_onAPIMappingLoadComplete=function(data){window.debugMsg("cnn_onAPIMappingLoadComplete called and referring url is :"+window.location.href),this.apiMapping=data,CNNVIDEOAPI.apiMapping=data,CNNVIDEOAPI.currentVersion=this.apiMapping.version,this.depMgr.loadApiDependenciesFromConfig(data),CNNVIDEOAPI.client!==void 0&&data.client!==void 0&&data.client[CNNVIDEOAPI.client]!==void 0&&data.client[CNNVIDEOAPI.client].config_paths!==void 0&&(CNNVIDEOAPI.deviceType=CNNVIDEOAPI.deviceType===void 0?"desktop":CNNVIDEOAPI.deviceType,CNNVIDEOAPI.configPaths=data.client[CNNVIDEOAPI.client].config_paths)},this.loadMapping=function(){this.utils.getDebug();var thisObj=this,mappingConfig={test:window.jQuery,failTestURL:"http://z.cdn.turner.com/cnn/.e/js/libs/jquery-1.9.1.min.js"},compFunc=function(){window.cnn_onAPIMappingLoadComplete=jQuery.proxy(thisObj.cnn_onAPIMappingLoadComplete,thisObj),thisObj.depMgr.loadJSON(thisObj.mappingFileURL)};this.depMgr.loadDependency(mappingConfig,compFunc)}},CNNVIDEOAPI.CNNVideoManager=function(){function init(){function broker(e){var data=CNNVIDEOAPI.Utils.deserializeJSONData(e.data),video=window.CNNVIDEOS[data.name];video&&video instanceof CNNVIDEOAPI.CNNIFrameVideoPlayer&&(window.frames[data.name],video.broker(e))}function updateAdKeywordOverrides(config,currentContextConfig,defaultContext){if(config.adsection!==void 0){var adOverride,contextAdKeyOverrides=jQuery.extend({},defaultContext.adSectionOverrideKeys,currentContextConfig.adSectionOverrideKeys),adOverrideKey=config.adsection||"";contextAdKeyOverrides!==void 0&&(adOverride=contextAdKeyOverrides[adOverrideKey.toLowerCase()]),adOverride!==void 0?(window.debugMsg("Video Ad SSID overide key '"+adOverrideKey+"' was requested which maps to '"+adOverride+"'"),config.adsection=adOverride):0===adOverrideKey.indexOf("const-")&&currentContextConfig.adsection!==void 0&&(window.debugMsg("Attempt was made to use an adsection override constant value of "+adOverrideKey+" which wasn't found. The default adsection '"+currentContextConfig.adsection+"' will be used instead"),config.adsection=currentContextConfig.adsection)}}function initializeVideoContainer(config,contextsConfig){if(Array.isArray(config)){var tempConfig=config[0];config=tempConfig}var vidConfig={},thisContext=CNNVIDEOAPI.Utils.getContextByName(contextsConfig,config.videoConfig),defaultContext=CNNVIDEOAPI.Utils.getDefaultContext(contextsConfig);updateAdKeywordOverrides(config.videoConfig,thisContext,defaultContext),jQuery.extend(vidConfig,thisContext),jQuery.extend(vidConfig,config.videoConfig);try{vidConfig.cvpId=CNNVIDEOAPI.Utils.getNextCVPId()}catch(error){window.errorMsg&&window.errorMsg("Couldn't set an cvp id. Default way of generating a CVP Id will be used. error is: ",error)}config.videoConfig=vidConfig;var videoInst;!thisContext.type&&defaultContext&&defaultContext.type&&(thisContext.type=defaultContext.type),videoInst=thisContext.type&&"embedded"===thisContext.type?new CNNVIDEOAPI.CNNEmbeddedVideoPlayer(config,contextsConfig):new CNNVIDEOAPI.CNNIFrameVideoPlayer(config,contextsConfig);try{if(window.CNNVIDEOS)for(var vidKeys=Object.keys(window.CNNVIDEOS),i=vidKeys.length-1;i>=0;i--){var vid=window.CNNVIDEOS[vidKeys[i]];vid.getParentMarkupId()===videoInst.getParentMarkupId()&&vid.getMarkupId()!==videoInst.getMarkupId()&&delete window.CNNVIDEOS[vidKeys[i]]}}catch(error){}window.CNNVIDEOS=window.CNNVIDEOS||{},window.CNNVIDEOS[videoInst.getMarkupId()]=videoInst}return{videoQueue:[],pauseOthers:function(videoPlayerContainerId){var i,requestingVideo,videoFrames=Object.keys(window.CNNVIDEOS),toPause=[];for(i=0,l=videoFrames.length;l>i;i++){var frame=window.CNNVIDEOS[videoFrames[i]],fname=videoFrames[i];fname===videoPlayerContainerId&&(requestingVideo=frame),fname!==videoPlayerContainerId&&toPause.push(frame)}if(requestingVideo&&requestingVideo.allowAutoPause())for(i=0;toPause.length>i;i++){var vid=toPause[i];vid.allowAutoPause()&&vid.pause()}},getVideoQueue:function(){return this.videoQueue},pauseVideo:function(){try{window.debugMsg("pauseVideo is not implemented yet")}catch(error){window.errorMsg("Video Player failed error is :"+error)}},stopVideo:function(containerId){try{this.getPlayerByContainer(containerId).stop()}catch(error){window.errorMsg("Video Player failed error is :"+error)}},replayVideo:function(containerId){try{this.getPlayerByContainer(containerId).replay()}catch(error){window.errorMsg("Video Player failed error is :"+error)}},playVideo:function(containerId,videoId,videoOverrides){try{this.getPlayerByContainer(containerId).play(videoId,videoOverrides?videoOverrides:{})}catch(error){window.errorMsg("Video Player failed error is :"+error)}},getPlayerByParentContainer:function(parentContainerId){for(var videoKeys=Object.keys(window.CNNVIDEOS),i=0,l=videoKeys.length;l>i;i++){var frame=window.CNNVIDEOS[videoKeys[i]];if(videoKeys[i],parentContainerId===frame.getParentMarkupId())return frame}},getPlayerByContainer:function(containerId){var video=window.CNNVIDEOS[containerId];return video||(window.infoMsg("Video Player not found for container Id '"+containerId+"'. Will check for a parent container with that name"),video=this.getPlayerByParentContainer(containerId)),video},renderVideoContainer:function(configObj){this.renderMultipleContainers(configObj)},getSectionConfigPath:function(site,profile,section,configPathOverride){var path,devicePath="";if(window.Modernizr!==void 0&&window.Modernizr.mobile&&(CNNVIDEOAPI.deviceType=window.Modernizr.phone?"phone":"tablet"),configPathOverride!==void 0&&configPathOverride)try{if(configPathOverride.desktop&&configPathOverride.tablet&&configPathOverride.phone)devicePath=configPathOverride[CNNVIDEOAPI.deviceType];else{if("string"!=typeof configPathOverrides)return this.getSectionConfigPath(site,profile,section);devicePath=configPathOverride}}catch(error){window.errorMsg("Failed to retrieve config path overrides. Will use defaults instead.",error)}else devicePath=CNNVIDEOAPI.configPaths[CNNVIDEOAPI.deviceType];return section&&""!==section?(section=section.replace(/-/g,""),path=devicePath):(window.warnMsg("CNNVideoManager.renderMultipleContainers: You did not specify an explicit 'section' value. The 'default' section will be used. If this isn't the behavior you expected, please check your configuration/setup for this player"),section="default",path=devicePath),path=path.replace("{hostandbasepath}",CNNVIDEOAPI.apiBaseUrl).replace("{version}",CNNVIDEOAPI.Utils.getVersion()).replace("{section}",section?section:"").replace("{site}",site).replace("{profile}",profile)},renderMultipleContainers:function(configArray){if(configArray&&!Array.isArray(configArray))return this.renderMultipleContainers([configArray]),void 0;for(var path,site,profile,section,thisObj=instance,configsToLoad={},cIndex=0;configArray.length>cIndex;cIndex++){var configObj=configArray[cIndex];this.getVideoQueue().push(configObj);var videoConfigObj=configObj.videoConfig,overrides=configObj.overridesConfig||{};if(site&&site!==videoConfigObj.network||profile&&profile!==videoConfigObj.profile){var msg="Mixing and matching network and/or profile types can cause dependency conflicts.\nMake sure network and profile values are the same for all the videos you are trying to create.\nThe program will now stop.";throw Error(msg)}site=videoConfigObj.network,profile=videoConfigObj.profile,section=videoConfigObj.section,videoConfigObj.context;var configPathOverride=overrides.configPathOverride;section&&""!==section?(section=section.replace(/-/g,""),path=this.getSectionConfigPath(site,profile,section,configPathOverride)):(window.warnMsg("CNNVideoManager.renderMultipleContainers: You did not specify an explicit 'section' value. The 'default' section will be used. If this isn't the behavior you expected, please check your configuration/setup for this player"),section="default",path=CNNVIDEOAPI.apiBaseUrl+CNNVIDEOAPI.Utils.getVersion()+"/config/"+site+"/"+profile+"/sectionconfig.json"),0>=Object.keys(configsToLoad).indexOf(path)&&(configsToLoad[section]=path)}var anonsectionLoadComplete=function(data,section){data=data.data?data.data:data,window.debugMsg("sectionLoadCompleteFunction section:"+section);for(var callback=function(){if(jQuery&&jQuery.receiveMessage&&broker!==void 0&&broker&&jQuery.receiveMessage(broker),thisObj.getVideoQueue().length>0)for(var cIndex=thisObj.getVideoQueue().length-1;cIndex>=0;cIndex--){section=void 0===section||""===section||"default"===section?"":section;var vConfig=thisObj.getVideoQueue()[cIndex],vConfigSection=vConfig.videoConfig.section?vConfig.videoConfig.section:"";if(section===vConfigSection){var config=thisObj.getVideoQueue()[cIndex];thisObj.getVideoQueue().splice(cIndex,1),initializeVideoContainer(config,data.contexts)}}},deps=[],apiDependencies=CNNVIDEOAPI.apiMapping||{},depArrayNames=["global_dependencies"],i=0;thisObj.videoQueue.length>i;i++){var vidConfig=thisObj.videoQueue[i].videoConfig,vidContextObj=data.contexts[vidConfig.context],defaultContextObj=data.contexts["default"];if((vidContextObj===void 0||null===vidContextObj)&&(vidContextObj=defaultContextObj,window.debugMsg("No context was found for '"+vidConfig.context+"'. Using default context. Please check your configuration")),vidContextObj){thisObj.videoQueue[i].overridesConfig&&jQuery.extend(vidContextObj,thisObj.videoQueue[i].overridesConfig),vidContextObj.type||(vidContextObj.type=defaultContextObj.type);var cType=vidContextObj.type?vidContextObj.type:defaultContextObj.type;if(cType){var depName=cType+"_dependencies";if(0>jQuery.inArray(depName)){depArrayNames.push(depName);var typeDep=apiDependencies[cType+"_dependencies"];typeDep&&jQuery.merge(deps,typeDep)}}}}CNNVIDEOAPI.DependencyManager.loadDependency(deps,callback)};if(path)for(var configKeys=Object.keys(configsToLoad),i=0;configKeys.length>i;i++){var sPath=configsToLoad[configKeys[i]],sSection=configKeys[i];window.debugMsg("setting window["+sSection+"SectionConfigLoadComplete]"),window[sSection+"SectionConfigLoadComplete"]=function(data){window.debugMsg("anonymouse callback for section:"+sSection),anonsectionLoadComplete(data,sSection)},CNNVIDEOAPI.DependencyManager.loadJSON(sPath,sSection+"SectionConfigLoadComplete")}}}}var instance;return{getInstance:function(){return instance||(instance=init()),window.cnnVideoManager&&window.cnnVideoManager!==instance?window.cnnVideoManager:instance}}}(),function(){window.cnnVideoManager||(window.cnnVideoManager=CNNVIDEOAPI.CNNVideoManager.getInstance())}(window),CNNVIDEOAPI.ClassBase=function(){var initializing=!1,fnTest=/xyz/.test(function(){})?/\b_super\b/:/.*/,Class=function(){};return Class.extend=function(prop){function Class(){!initializing&&this.init&&this.init.apply(this,arguments)}var _super=this.prototype;initializing=!0;var prototype=new this;initializing=!1;for(var name in prop)prototype[name]="function"==typeof prop[name]&&"function"==typeof _super[name]&&fnTest.test(prop[name])?function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);return this._super=tmp,ret}}(name,prop[name]):prop[name];return Class.prototype=prototype,Class.constructor=Class,Class.extend=arguments.callee,Class},Class}(),CNNVIDEOAPI.DependencyManager={loadApiDependenciesFromConfig:function(data){var compFunc=function(){window.debugMsg("DependencyManager: All dependencies loaded. About to call CNNVideoAPILoadComplete");var callClientFunc=function(){window.CNNVideoAPILoadComplete?window.CNNVideoAPILoadComplete():window.errorMsg('CNNVideoAPILoadComplete function not defined. Make sure you have a CNNVideoAPILoadComplete function defined and assigned as a window function. Eg window["CNNVideoAPILoadComplete"] = yourFunction;');try{if(void 0!==window.CNNVideoAPILoadCompleteHandlers&&Array.isArray(window.CNNVideoAPILoadCompleteHandlers))for(var i=0;window.CNNVideoAPILoadCompleteHandlers.length>i;i++){var loadCompFunc=window.CNNVideoAPILoadCompleteHandlers[i];"function"==typeof loadCompFunc&&loadCompFunc()}}catch(error){}};callClientFunc()},dependencies=data.global_dependencies;CNNVIDEOAPI.client!==void 0&&data.client!==void 0&&data.client[CNNVIDEOAPI.client]!==void 0&&data.client[CNNVIDEOAPI.client].client_dependencies!==void 0&&Array.isArray(data.client[CNNVIDEOAPI.client].client_dependencies)&&(dependencies=jQuery.merge(dependencies,data.client[CNNVIDEOAPI.client].client_dependencies)),this.loadDependency(dependencies,compFunc)},loadJSON:function(url,callbackFuncName){jQuery.ajax({url:url,dataType:"jsonp",type:"GET",async:!0,contentType:"application/json;",jsonpCallback:callbackFuncName?callbackFuncName:"callbackObj",processData:!0,cache:!0,data:{}})},getScripts:function(scripts,callback){window.debugMsg("DependencyManager getScripts and scripts are, ",scripts);var progress=0,internalCallback=function(){++progress==scripts.length&&callback()};scripts.forEach(function(script){jQuery.ajaxSetup({cache:!0}),jQuery.getScript(script,internalCallback)})},checkIfAssetLoadedHandler:function(scope,failTestConfigs,scriptURLs,completeCallback){window.debugMsg("DependencyManger checkIfAssetLoadedHandler Checking if resources actually loaded");for(var failed=!1,i=0;failTestConfigs.length>i;i++){var itemData=failTestConfigs[i];if(itemData.failTestURL){var test=CNNVIDEOAPI.Utils.getTestFromString(itemData.test);if(window.debugMsg("DependencyManager after initial load testing script load and test result is ",test?!0:!1),"function"==typeof test&&!test){window.debugMsg("DependencyManager failed to load a resource so gonna reload failed resource is ",itemData.failTestURL),failed=!0;break}}}failed?(window.debugMsg("DependencyManager and going to call getScripts again due to a failure"),scope.getScripts(scriptURLs,completeCallback)):completeCallback()},loadDependency:function(config,completeCallback){var cacheBustDependencies=!1,scriptURLs=[],failTestConfigs=[];Array.isArray(config)||(config=[config]);for(var self=this,scriptArray=[],i=0;config.length>i;i++){var itemData=config[i],test=CNNVIDEOAPI.Utils.getTestFromString(itemData.test);window.debugMsg("DependencyManager checking dependency to see if it needs to be loaded: ",itemData.failTestURL),("function"==typeof test&&!test||"boolean"==typeof test&&!test)&&(window.debugMsg("DependencyManager dependency doesn't already exist adding ",itemData.failTestURL),scriptURLs.push(itemData.failTestURL),failTestConfigs.push(itemData));var loadConfig={test:CNNVIDEOAPI.Utils.getTestFromString(itemData.test),nope:itemData.failTestURL+(cacheBustDependencies?"?cb="+Math.round(1e9*Math.random()).toString(16):""),callback:function(){window.debugMsg("DependencyManager callback itemData.id callback:"+itemData.id)},complete:function(){window.debugMsg("DependencyManager load of "+itemData.id+" is complete")}};void 0!==itemData.passTestURL&&(loadConfig.yep=itemData.passTestURL),scriptArray.push(loadConfig)}var compObj={complete:function(){checkIfAssetLoadedHandler(this,failTestConfigs,scriptURLs,completeCallback)}};scriptArray.push(compObj),0>=scriptURLs.length&&completeCallback?completeCallback():this.getScripts(scriptURLs,function(){self.checkIfAssetLoadedHandler(self,failTestConfigs,scriptURLs,completeCallback)})}},CNNVIDEOAPI.Utils={tmpl:function(format,tokens){var re=/\{\{([^{\}]+)\}\}/g;return(format+"").replace(re,function(placeholder,token){return token in(tokens||{})?/^f/.test(typeof tokens[token])?tokens[token]():tokens[token]:placeholder})},getNextCVPId:function(){return window.CVP_INDEX||(window.CVP_INDEX=0),window.CVP_INDEX+=1,"cvp_"+window.CVP_INDEX},copyObjectProperty:function(receivingObj,origObj,copyFromObj,propertyName){receivingObj=receivingObj!==void 0?receivingObj:{};var tempVal=origObj[propertyName];return copyFromObj!==void 0&&copyFromObj[propertyName]!==void 0&&(tempVal=copyFromObj[propertyName]),tempVal!==void 0&&(receivingObj[propertyName]=tempVal),receivingObj},createStylesheet:function(styleText){var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css",style.styleSheet?style.styleSheet.cssText=styleText:style.appendChild(document.createTextNode(styleText)),head.appendChild(style)},eventLogger:function(data){window.debugMsg(data)},getPlayerType:function(agent){return/\b(Kindle|Fire|Silk|Android|IEMobile)\b/gi.test(agent)?CVP.HTML5:CVP.FLASH},getEditionURL:function(cookie){var parent_url=decodeURIComponent(document.location.hash.replace(/^#/,""));if(parent_url)return parent_url;var edition="www",matches=/SelectedEdition=(www|edition);/.exec(cookie);return null!==matches&&matches.length&&matches[1].length&&(edition=matches[1]),/((www|edition|us)\.)?(preview\.)?((dev|ref|train|cnnpreview)\.)cnn\.com(:(82|94|80))?/.test(document.location.host)?"http://"+document.location.host:"http://"+edition+".cnn.com"},generateWindowVariables:function(varNameStr,value,overwriteExisting){overwriteExisting=overwriteExisting?overwriteExisting:!0;var nmToCreate="",finalVarName="";if("string"==typeof varNameStr){var tmpArray=varNameStr.split(".");if(tmpArray.length>1){finalVarName=tmpArray.pop(),nmToCreate=tmpArray.join(".");var impl=this.createNamespaceFromString(nmToCreate);!impl[finalVarName]||overwriteExisting?impl[finalVarName]=value:window.debugMsg("Variable '"+varNameStr+"' already exists. Will not set.")}else!window[varNameStr]||overwriteExisting?window[varNameStr]=value:window.debugMsg("Variable '"+varNameStr+"' already exists. Will not set.")}},createNamespaceFromString:function(name,separator,container){var i,len,ns=name.split(separator||"."),o=container||window;for(i=0,len=ns.length;len>i;i++)o=o[ns[i]]=o[ns[i]]||{};return o},deserializeJSONData:function(data){if(null===data||""===data)return null;if("object"!=typeof data)try{data=window.JSON.parse(data)}catch(err){data=jQuery.deparam(data)}return data},getContextByName:function(contexts,videoConfig){try{var contextToFind=videoConfig.context;return contexts[contextToFind]?contexts[contextToFind]:(window.warnMsg("Could not find context '"+contextToFind+"'. Will use the 'default' context. Please add "+contextToFind+" to your configuration. \nVideo Configuration for missing context is:\nnetwork:'"+videoConfig.network+"'\nprofile:'"+videoConfig.profile+"' \nsection'"+videoConfig.section+"'\n"),contexts["default"])}catch(err){return{}}},getDefaultContext:function(contexts){try{return contexts["default"]}catch(err){return{}}},getTestFromString:function(str){var evaled=eval(str);return void 0===evaled?!1:evaled},getQueryStringParameter:function(queryStringKey){try{for(var query=location.search.replace("?",""),values=query.split("&"),i=0;values.length>i;i++){var vals=values[i],arg=vals.split("="),key=arg[0],val=arg[1];if(key.replace(" ","")===queryStringKey)return val}}catch(error){}},getDebug:function(){try{for(var query=location.search.replace("?",""),values=query.split("&"),i=0;values.length>i;i++){var vals=values[i],arg=vals.split("="),key=arg[0],val=arg[1];"debug"===key.replace(" ","")&&(window.debugMode=val)}}catch(error){}},getVersion:function(){if(!CNNVIDEOAPI.currentVersion){try{for(var script_tag=document.getElementById("cnnAPIJS"),query=script_tag.src.replace(/^[^\?]+\??/,""),values=query.split("&"),i=0;values.length>i;i++){var vals=values[i],arg=vals.split("="),key=arg[0],val=arg[1];if("version"===key.replace(" ",""))return val}}catch(error){}return"latest"}return CNNVIDEOAPI.currentVersion}};