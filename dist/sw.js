if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const l=e=>s(e,o),t={module:{uri:o},exports:c,require:l};i[o]=Promise.all(r.map((e=>t[e]||l(e)))).then((e=>(n(...e),c)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-7e8348ca.css",revision:null},{url:"assets/polyfills-legacy-f32b354e.js",revision:null},{url:"index.html",revision:"1909d890ae37b4c29fe05668a01c9676"},{url:"registerSW.js",revision:"e1914ba3510bb6500698fef1cc3bc856"},{url:"wasm/wasm/web-ifc-mt.worker.js",revision:"ce1cb1f120272cde0e82ab844d8a5561"},{url:"wasm/web-ifc-mt.worker.js",revision:"ce1cb1f120272cde0e82ab844d8a5561"},{url:"logo192.png",revision:"ad7efb0d7a24cc72ac684dab5d8258e0"},{url:"logo256.png",revision:"2432da0565a7519a9a79c662520dd05b"},{url:"logo512.png",revision:"4c67b1aff60e1d08be226ddcc8cdcff5"},{url:"manifest.webmanifest",revision:"6103d18e8329dd32cb87181342329b0b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));