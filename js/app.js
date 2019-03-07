console.log("app.js", "Hello World!");

class App {
  constructor() {
    let body = document.getElementsByTagName("body")[0];
    let pre = body.getElementsByTagName("pre")[0];
    let el = pre || body;
    let page = 1;

    this.state = {
      converter: new showdown.Converter({emoji: true}),
      el: el,
      page: page,
      slides: el.innerHTML.split("---").map(s => s.trim())
    }
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
    let text = slides[page - 1];
    let html = converter.makeHtml(text);

    el.innerHTML = html;
  }
}

window.onload = () => new App().init();
