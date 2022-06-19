if(window.localStorage.length > 0 && localStorage.getItem('link0')!== null) { 
1
  let fulllink = document.createElement('div');

  fulllink.setAttribute('class','full-link');

  let shortlink = document.createElement('div');

  fulllink.setAttribute('class','shorted-link');

  let fl = document.createElement('a');

  let sl = document.createElement('a');

  let box = document.createElement('div');

  box.setAttribute('class','box');

  let cop = document.createElement('button');
    cop.textContent = 'copy';
  let container = document.querySelector('.prev-links');
  cop.classList.add("active","copy");
  
  for(let i=0;i<localStorage.length;i++) { 
    
    let url = localStorage.getItem(`link${i}`).split(',');
    
    fl.textContent= url[0];

    sl.textContent= url[1];
    
    fulllink.appendChild(fl);
    
    shortlink.appendChild(sl);
    
    box.appendChild(fulllink);
    
    box.appendChild(shortlink);
    
    box.appendChild(cop);
    container.appendChild(box);
  }
}
const url = document.querySelector("#url");

const message = document.querySelector('#message');

// box of link
const container = document.querySelector('.prev-links');

const box = document.createElement('div');

box.classList.add('box');

const containerFullLink =  document.createElement('div');

containerFullLink.classList.add ('full-link');

const fulllink = document.createElement('a');

const containerShortedLink = document.createElement("div");

const shortLink = document.createElement('a');

containerShortedLink.classList.add( 'shorted-link');

const copybtn = document.createElement('button');

copybtn.classList.add('active');

copybtn.textContent = "copy";

// end box of link

const form = document.forms[0];

let counter = localStorage.length > 0 ? localStorage.length:0;

form.addEventListener('submit',function(e) {
  e.preventDefault();
  if(url.value ==="") { 
    message.classList.add('error');
    
    url.classList.add("error");
    
    message.textContent = "Please add a link"
  }
  else { 
      message.textContent = "";

      message.classList.remove('error');

      url.classList.remove('error');

      let localstorageprev = localStorage.getItem(`link${counter-1}`) !==null ? localStorage.getItem(`link${counter-1}`).split(','):
      [];
      if(localstorageprev[0] !==url.value) {
      
        fetch(`https://api.shrtco.de/v2/shorten?url=${url.value}`)

        .then(res => res.json())

        .then(data => {
          
          fulllink.textContent = data.result.original_link;
          
          containerFullLink.appendChild(fulllink);
          
          shortLink.textContent = data.result.short_link;
 
          window.localStorage.setItem(`link${counter}`,`${fulllink.textContent},${shortLink.textContent}`);
          
        containerShortedLink.appendChild(shortLink);

        box.appendChild(containerFullLink);

        box.appendChild(containerShortedLink);

        
        copybtn.classList.add('copy');
        
        box.appendChild(copybtn);


        container.appendChild(box);
        

        counter++;

      })
      .catch(error => console.log(error));
    }
    else {
    }
  }
});

// copy text to clipboard after press the copy button 


  document.addEventListener('click', function(e) { 

      const element  = e;
        let parent = e.target.parentElement;

      if(e.target.classList.contains('copy')) {

        let link = parent.children[1].children[0].textContent;
        navigator.clipboard.writeText(link)
        .catch(e=>console.log(e))

        e.target.classList.remove('active');
        e.target.classList.add('copied');
        e.target.textContent = 'Copied!'

        setTimeout(function(){

          element.target.classList.remove('copied');
          element.target.classList.add('active');
          element.target.textContent ="Copy";

        },500);
      }
    });
  
