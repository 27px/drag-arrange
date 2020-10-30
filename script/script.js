var getElementByOrder=order=>{
  order=parseInt(order);
  var items=document.querySelectorAll(".drag-item");
  for(i=0;i<items.length;i++)
  {
    if(items[i].style.order==order)
    {
      return items[i];
    }
  }
  return false;
};
window.onload=function(){
  var items=document.querySelectorAll(".drag-item");
  items.forEach((item,i)=>{
    item.style.order=i+1;
    item.addEventListener("dragstart",function(){
      item.setAttribute("x",event.clientX);
      item.setAttribute("y",event.clientY);
      event.dataTransfer.setData("text/plain",item.style.order);
    });
    item.addEventListener("dragend",function(){
      item.setAttribute("x",0);
      item.setAttribute("y",0);
    });
    item.addEventListener("dragenter",function(){
      // console.log("item enter");
    });
    item.addEventListener("dragleave",function(){
      item.classList.remove("show-below");
      item.classList.remove("show-above");
    });
    item.addEventListener("dragover",function(){
      event.preventDefault();
      var y=event.offsetY;
      var mh=this.clientHeight/2;
      if(y<mh)
      {
        item.classList.add("show-above");
        item.classList.remove("show-below");
      }
      else
      {
        item.classList.add("show-below");
        item.classList.remove("show-above");
      }
    });
    item.addEventListener("drop",function(){
      var order=item.style.order;
      item.classList.remove("show-below");
      item.classList.remove("show-above");
      var y=event.offsetY;
      var mh=this.clientHeight/2;
      var sourceOrder=parseInt(event.dataTransfer.getData("text/plain"));
      var destinationOrder=parseInt(item.style.order);
      var destination,source;
      if(sourceOrder==destinationOrder)
      {
        return;//same element
      }
      if(y<mh)
      {
        if(parseInt(sourceOrder)+1==destinationOrder)
        {
          return;//no change in position
        }
        source=getElementByOrder(sourceOrder);
        destination=getElementByOrder(destinationOrder);
        if(sourceOrder<destinationOrder)
        {
          let temp=destinationOrder-1;
          for(let i=sourceOrder+1;i<destinationOrder;i++)
          {
            getElementByOrder(i).style.order=i-1;
          }
          source.style.order=temp;
        }
        else
        {
          let temp=destinationOrder;
          for(let i=sourceOrder-1;i>=destinationOrder;i--)
          {
            getElementByOrder(i).style.order=i+1;
          }
          source.style.order=temp;
        }
      }
      else
      {
        if(parseInt(sourceOrder)-1==destinationOrder)
        {
          return;//no change in position
        }
        console.log("bottom");
        source=getElementByOrder(sourceOrder);
        destination=getElementByOrder(destinationOrder);
        if(sourceOrder<destinationOrder)
        {
          let temp=destinationOrder;
          for(let i=sourceOrder+1;i<destinationOrder+1;i++)
          {
            getElementByOrder(i).style.order=i-1;
          }
          source.style.order=temp;
        }
        else
        {
          let temp=destinationOrder;
          for(let i=sourceOrder-1;i>destinationOrder;i--)
          {
            getElementByOrder(i).style.order=i+1;
          }
          source.style.order=temp;
        }
      }
    });
  })
}
