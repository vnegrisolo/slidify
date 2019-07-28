console.log("app.js", "Hello World!");

class App {
  constructor() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("solarized-light");
    let pre = body.getElementsByTagName("pre")[0];
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

    this.state = { converter, body, slides }
  }
  init() {
    this.listenKeyPresses();
    this.render();
  }
  getPage() {
    return parseInt(window.location.hash.substring(1) || "1");
  }
  pushHistory(page) {
    history.pushState({}, `Page ${page}`, `#${page}`);
    this.render();
  }
  toogleClass(el, class1, class2) {
    if(el.classList.contains(class1)){
      el.classList.add(class2);
      el.classList.remove(class1);
    } else {
      el.classList.add(class1);
      el.classList.remove(class2);
    }
  }
  listenKeyPresses() {
    window.addEventListener("keydown", e => {
      let {slides} = this.state;
      let page = this.getPage();

      if (e.key === "ArrowRight" && page < slides.length){
        this.pushHistory(page + 1);
      }
      if (e.key === "ArrowLeft" && page > 1){
        this.pushHistory(page - 1);
      }
      if (e.key === "T"){
        let body = document.getElementsByTagName("body")[0];
        this.toogleClass(body, "solarized-light", "solarized-dark")
      }
    });
  }
  render() {
    let {converter, body, slides} = this.state;
    let page = this.getPage();
    let slide = slides[page - 1];
    let html = converter.makeHtml(slide.content);

    console.clear();
    slide.comment && console.log(slide.comment);
    body.innerHTML = html;

    body.querySelectorAll("pre code").forEach((block) => {
      Prism.highlightElement(block);
    });
  }
}

window.onload = () => new App().init();
