console.log("app.js", "Hello World!");

class App {
  constructor() {
    let body = document.getElementsByTagName("body")[0];
    let pre = body.getElementsByTagName("pre")[0];
    let el = pre || body;
    let page = 1;

    this.state = {
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
    let {el, slides, page} = this.state;
    el.innerHTML = slides[page - 1];
  }
}

window.onload = () => new App().init();
