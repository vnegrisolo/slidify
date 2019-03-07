console.log("app.js", "Hello World!");

class App {
  constructor() {
    let body = document.getElementsByTagName("body")[0];
    let pre = body.getElementsByTagName("pre")[0];
    let el = pre || body;
    let page = 1;
    let converter = new showdown.Converter({emoji: true});
    let regexp = /^<!--(.*)-->$/sm;

    let slides = el.textContent.split("---").map(s => {
      return {
        content: s.replace(regexp, "").replace(/\n\n\n+/, "\n\n").trim(),
        comment: ((s.match(regexp) || [])[1] || "").trim()
      };
    })

    this.state = { converter, el, page, slides }
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
    let {converter, el, slides, page} = this.state;
    let slide = slides[page - 1];
    let html = converter.makeHtml(slide.content);
    if(slide.comment && slide.comment != "") {
      console.log(slide.comment);
    }

    el.innerHTML = html;
  }
}

window.onload = () => new App().init();
