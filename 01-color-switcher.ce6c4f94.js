const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},e=document.body;t.startBtn.addEventListener("click",(()=>{t.startBtn.disabled="disabled",t.stopBtn.removeAttribute("disabled"),intervalId=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopBtn.addEventListener("click",(()=>{!function(e){t.startBtn.removeAttribute("disabled"),t.stopBtn.disabled="disabled",clearInterval(e)}(intervalId)}));
//# sourceMappingURL=01-color-switcher.ce6c4f94.js.map
