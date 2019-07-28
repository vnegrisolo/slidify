console.log("app.js", "Hello World!");

class App {
  constructor() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("solarized-light");
    let pre = body.getElementsByTagName("pre")[0];
    let page = 1;
    const classMap = {
      pre: 'line-numbers'
    }
    const bindings = Object.keys(classMap).map(key => ({
      type: 'output',
      regex: new RegExp(`<${key}(.*)>`, 'g'),
      replace: `<${key} class="${classMap[key]}" $1>`
    }));
    let converter = new showdown.Converter({
      emoji: true,
      tables: true,
      extensions: [...bindings]
    });
    let regexp = /^<!--(.*)-->$/sm;

    let slides = (pre || body).textContent.split("---\n").map(s => {
      return {
        content: s.replace(regexp, "").replace(/\n\n\n+/, "\n\n").trim(),
        comment: ((s.match(regexp) || [])[1] || "").trim()
      };
    })

    this.state = { converter, body, page, slides }
  }
  init() {
    this.listenKeyPresses();
    this.render();
  }
  listenKeyPresses() {
    window.addEventListener("keydown", e => {
      let {page, slides} = this.state;

      if (e.key === "ArrowRight" && page < slides.length){
        this.setState("page", page + 1);
      }
      if (e.key === "ArrowLeft" && page > 1){
        this.setState("page", page - 1);
      }
    });
  }
  setState(key, value) {
    this.state[key] = value;
    this.render();
  }
  render() {
    let {converter, body, slides, page} = this.state;
    let slide = slides[page - 1];
    let html = converter.makeHtml(slide.content);

    console.clear();
    if(slide.comment && slide.comment != "") {
      console.log(slide.comment);
    }

    body.innerHTML = html;

    body.querySelectorAll("pre code").forEach((block) => {
      Prism.highlightElement(block);
    });
  }
}

window.onload = () => new App().init();
