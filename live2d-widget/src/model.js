import o from"./message.js";import l from"./utils.js";class d{constructor(e){let{apiPath:t,cdnPath:s}=e,i=!1;if(typeof s=="string")i=!0,s.endsWith("/")||(s+="/");else if(typeof t=="string")t.endsWith("/")||(t+="/");else throw"Invalid initWidget argument!";this.useCDN=i,this.apiPath=t,this.cdnPath=s}async loadModelList(){const e=await fetch(`${this.cdnPath}model_list.json`);this.modelList=await e.json()}async loadModel(e,t,s){if(localStorage.setItem("modelId",e),localStorage.setItem("modelTexturesId",t),o(s,4e3,10),this.useCDN){this.modelList||await this.loadModelList();const i=l(this.modelList.models[e]);loadlive2d("live2d",`${this.cdnPath}model/${i}/index.json`)}else loadlive2d("live2d",`${this.apiPath}get/?id=${e}-${t}`),console.log(`Live2D \u6A21\u578B ${e}-${t} \u52A0\u8F7D\u5B8C\u6210`)}async loadRandModel(){const e=localStorage.getItem("modelId"),t=localStorage.getItem("modelTexturesId");if(this.useCDN){this.modelList||await this.loadModelList();const s=l(this.modelList.models[e]);loadlive2d("live2d",`${this.cdnPath}model/${s}/index.json`),o("\u6211\u7684\u65B0\u8863\u670D\u597D\u770B\u561B\uFF1F",4e3,10)}else fetch(`${this.apiPath}rand_textures/?id=${e}-${t}`).then(s=>s.json()).then(s=>{s.textures.id===1&&(t===1||t===0)?o("\u6211\u8FD8\u6CA1\u6709\u5176\u4ED6\u8863\u670D\u5462\uFF01",4e3,10):this.loadModel(e,s.textures.id,"\u6211\u7684\u65B0\u8863\u670D\u597D\u770B\u561B\uFF1F")})}async loadOtherModel(){let e=localStorage.getItem("modelId");if(this.useCDN){this.modelList||await this.loadModelList();const t=++e>=this.modelList.models.length?0:e;this.loadModel(t,0,this.modelList.messages[t])}else fetch(`${this.apiPath}switch/?id=${e}`).then(t=>t.json()).then(t=>{this.loadModel(t.model.id,0,t.model.message)})}}export default d;
