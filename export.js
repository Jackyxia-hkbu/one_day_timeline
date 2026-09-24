// Draw only itinerary data into the PNG; preview controls stay outside the image.
function createTimelinePng(items, legs, times) {
 const canvas=document.createElement('canvas');
 const ctx=canvas.getContext('2d');
 const font='"PingFang SC", "Microsoft YaHei", sans-serif';
 const gap=240, padding=125, lineY=106;
 ctx.font=`18px ${font}`;
 const names=items.map(item=>{
  const lines=[];let line='';
  for(const character of item.name){
   if(ctx.measureText(line+character).width>190&&line){lines.push(line);line='';}
   line+=character;
  }
  lines.push(line);return lines;
 });
 const width=Math.max(320,padding*2+(items.length-1)*gap);
 const height=170+Math.max(...names.map(lines=>lines.length))*27;
 canvas.width=width*2;canvas.height=height*2;
 ctx.scale(2,2);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);
 const xAt=i=>items.length===1?width/2:padding+i*gap;
 ctx.strokeStyle='#2563eb';ctx.lineWidth=3;
 ctx.beginPath();ctx.moveTo(xAt(0),lineY);ctx.lineTo(xAt(items.length-1),lineY);ctx.stroke();
 ctx.textAlign='center';ctx.textBaseline='middle';
 legs.forEach((leg,i)=>{
  const x=(xAt(i)+xAt(i+1))/2;
  // Normalize entered duration notation to keep even long inputs readable.
  const minutes=Timeline.parseDuration(leg);
  const text=minutes>=60?`${Math.floor(minutes/60)}h${minutes%60?String(minutes%60)+'min':''}`:`${minutes}min`;
  ctx.font=`16px ${font}`;
  const textWidth=ctx.measureText(text).width;
  ctx.fillStyle='#fff';ctx.fillRect(x-textWidth/2-10,lineY-16,textWidth+20,32);
  ctx.fillStyle='#2563eb';ctx.fillText(text,x,lineY);
 });
 items.forEach((item,i)=>{
  const x=xAt(i);
  ctx.font=`600 28px ${font}`;ctx.fillStyle='#17253e';ctx.fillText(Timeline.formatTime(times[i]),x,54);
  ctx.beginPath();ctx.arc(x,lineY,8,0,Math.PI*2);ctx.fillStyle='#2563eb';ctx.fill();
  ctx.font=`18px ${font}`;ctx.fillStyle='#17253e';
  names[i].forEach((line,j)=>ctx.fillText(line,x,151+j*27));
 });
 return canvas.toDataURL('image/png');
}
el('export').onclick=()=>{
 const {times,errors}=calculate(nodes,durations);
 const incomplete=durations.some(d=>parseDuration(d)===null)||nodes.some(n=>n.manualTime!==null&&parseTime(n.manualTime)===null)||times.some(t=>t===null||t<0||t>=1440);
 if(incomplete||errors.length){
  el('status').className='status warning';
  el('status').textContent='请先补全有效时间和耗时，并解决时间冲突或跨日问题，再导出图片。';
  return;
 }
 el('timeline-image').src=createTimelinePng(nodes,durations,times);
 el('image-preview').showModal();
};
el('close-preview').onclick=()=>el('image-preview').close();
